package com.cse.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import com.cse.domain.Attendance;
import com.cse.domain.Faculty;
import com.cse.domain.Student;
import com.cse.domain.StudentCalc;
import com.cse.domain.Subject;
import com.cse.domain.SubjectTimeTable;
import com.cse.domain.TimeTable;
import com.cse.domain.enumeration.DayOfWeek;
import com.cse.service.AcademicSessionService;
import com.cse.service.AttendanceService;
import com.cse.service.CalculatorService;
import com.cse.service.SpecialOccasionsService;
import com.cse.service.StudentService;
import com.cse.service.TimeTableService;
import com.cse.service.UserService;
import com.cse.service.dto.AcademicSessionDTO;
import com.cse.service.dto.AttendanceDTO;
import com.cse.service.dto.SpecialOccasionsDTO;
import com.cse.service.dto.StudentDTO;
import com.cse.service.dto.SubjectDTO;
import com.cse.service.dto.TimeTableDTO;
import com.cse.service.dto.UserDTO;
import com.cse.service.mapper.StudentMapper;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    private final AttendanceService attendanceService;
    private final AcademicSessionService academicSessionService;
    private final TimeTableService timeTableService;
    private final SpecialOccasionsService specialOccasionsService;
    private final UserService userService;
    private final StudentService studentService;
    private final HODService hodService;
    private final FacultyService facultyService;





    public Long returnNumberOfWorkingDays() {
        Optional<AcademicSessionDTO> as = academicSessionService.forNow(Instant.now());
        Instant startdate = as.get().getStartDate();
        Long count = Long.parseLong("0");
        count = ChronoUnit.DAYS.between(startdate, Instant.now());
        int startW = LocalDate.from(startdate.atZone(ZoneId.of("Z"))).getDayOfWeek().getValue();
        int endW = LocalDate.from(Instant.now().atZone(ZoneId.of("Z"))).getDayOfWeek().getValue();
        if (count % 7 != 0) {
            if (startW == 6) {
                count -= 1;
            } else if (endW == 6) {
                count -= 1;
            } else if (endW < startW) {
                count -= 2;
            }
        }
        count = count - 2 * (long) (count / 7);
        List<SpecialOccasionsDTO> spo = specialOccasionsService.findForNow(startdate, Instant.now());
        LocalDateTime now = LocalDateTime.from(Instant.now().atZone(ZoneId.of("Z")));
        Set<LocalDateTime> holiday = new HashSet<>();
        for (SpecialOccasionsDTO var : spo) {
            LocalDateTime start = LocalDate.from(var.getStartDate().atZone(ZoneId.of("Z"))).atStartOfDay();
            LocalDateTime end = LocalDate.from(var.getStartDate().atZone(ZoneId.of("Z"))).plusDays(1).atStartOfDay();

            LocalDateTime iterator = start;
            while (iterator.isBefore(end) && iterator.isBefore(now)) {
                int dayOfWeek = iterator.getDayOfWeek().ordinal();
                if (dayOfWeek != 7 && dayOfWeek != 6) {
                    holiday.add(iterator);
                }
                iterator = iterator.plusDays(1);
            }
        }
        count -= holiday.size();
        return count;
    }

    public List<StudentCalc> getStudentAttendanceDetails(String id) {
        Student student = studentService.findRaw(id).get();
        String deviceID = student.getUser().getDeviceID();
        if (deviceID == null){
            return null;
        }
        List<Attendance> sadtos = attendanceService.findAllRawByDeviceID(deviceID);
        TimeTableDTO tdto = new TimeTableDTO();
        tdto.setDepartmentId(student.getDepartment().getId());
        tdto.setYear(student.getCurrentYear());
        tdto.setSemester(student.getCurrentSem());
        Optional<TimeTable> tt = timeTableService.findBySemYearDept(tdto);
        Map<Integer, Set<SubjectTimeTable>> frame = new HashMap<>();
        if (tt.isPresent()) {
            TimeTable tto = tt.get();
            tto.getDayTimeTables().forEach(action -> {
                int ord = action.getDayOfWeek().ordinal();
                frame.put(ord, action.getSubjects());
            });
        } else {
            return null;
        }
        Map<String, Long> attendanceCounter = new HashMap<>();
        Map<String, Long> totalCounter = new HashMap<>();
        Map<Integer, Long> daysByWeek = calculateDaysPerWeekStudents();
        frame.keySet().forEach(dow -> {
            if (daysByWeek.containsKey(dow)) {
                frame.get(dow).forEach(sub -> {
                        Subject subj = sub.getSubject();
                        String key = subj.getSubjectCode() + "-" + subj.getSubjectName();
                        if (totalCounter.containsKey(key)) {
                            totalCounter.put(key, totalCounter.get(key) + daysByWeek.get(dow));
                        } else {
                            totalCounter.put(key, daysByWeek.get(dow));
                        }
                });
            }
        });
        sadtos.forEach(sa -> {
            LocalDateTime time = LocalDateTime.from(sa.getTimestamp().atZone(ZoneId.of("Z")));
            int att = time.toLocalTime().plusHours(5).plusMinutes(30).toSecondOfDay();
            int dow = time.getDayOfWeek().ordinal();
            frame.get(dow).forEach(sub -> {
                Subject subj = sub.getSubject();

                if (sub.getLocation().getId().toString().equals(sa.getDev().getDevLoc().getId().toString())) {
                    String key = subj.getSubjectCode() + "-" + subj.getSubjectName();
                    if (sub.getStartTime() < att && sub.getEndTime() > att) {
                        if (attendanceCounter.containsKey(key)) {
                            attendanceCounter.put(key, attendanceCounter.get(key) + 1);
                        } else {
                            attendanceCounter.put(key, (long) 1);
                        }
                    }
                }
            });
        });
        List<StudentCalc> ret = new ArrayList<>();
        attendanceCounter.keySet().forEach(key -> {
            ret.add(new StudentCalc(key, attendanceCounter.get(key), totalCounter.get(key)));
        });
        return ret;
    }

    public Map<Integer, Long> calculateDaysPerWeekStudents() {
        Optional<AcademicSessionDTO> as = academicSessionService.forNow(Instant.now());
        Instant startdate = as.get().getStartDate();
        Long count = Long.parseLong("0");
        count = ChronoUnit.DAYS.between(startdate, Instant.now());
        int startW = LocalDate.from(startdate.atZone(ZoneId.of("Z"))).getDayOfWeek().getValue();
        int endW = LocalDate.from(Instant.now().atZone(ZoneId.of("Z"))).getDayOfWeek().getValue();
        count = (long) (count / 7);
        List<SpecialOccasionsDTO> spo = specialOccasionsService.findForNow(startdate, Instant.now());
        LocalDateTime now = LocalDateTime.from(Instant.now().atZone(ZoneId.of("Z")));
        Set<LocalDateTime> holiday = new HashSet<>();
        Map<Integer, Long> holidaysByWeek = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            holidaysByWeek.put(i, count);
        }
        for (SpecialOccasionsDTO var : spo) {
            LocalDateTime start = LocalDate.from(var.getStartDate().atZone(ZoneId.of("Z"))).atStartOfDay();
            LocalDateTime end = LocalDate.from(var.getStartDate().atZone(ZoneId.of("Z"))).plusDays(1).atStartOfDay();

            LocalDateTime iterator = start;
            while (iterator.isBefore(end) && iterator.isBefore(now)) {
                int dayOfWeek = iterator.getDayOfWeek().ordinal();
                if (dayOfWeek != 7 && dayOfWeek != 6) {
                    if (holidaysByWeek.containsKey(dayOfWeek) && !holiday.contains(iterator)) {
                        holidaysByWeek.put(dayOfWeek, holidaysByWeek.get(dayOfWeek) - 1);
                    }
                    holiday.add(iterator);
                }
                iterator = iterator.plusDays(1);
            }
        }
       for (int i = startW; i < endW ; i++) {
           holidaysByWeek.put(i, holidaysByWeek.get(i) + 1);
       }
       return holidaysByWeek;
    }

    public Long returnNumberOfWorkingDaysForFaculty() {
        Optional<AcademicSessionDTO> as = academicSessionService.forNow(Instant.now());
        Instant startdate = as.get().getStartDate();
        Long count = Long.parseLong("0");
        count = ChronoUnit.DAYS.between(startdate, Instant.now());
        int startW = LocalDate.from(startdate.atZone(ZoneId.of("Z"))).getDayOfWeek().getValue();
        int endW = LocalDate.from(Instant.now().atZone(ZoneId.of("Z"))).getDayOfWeek().getValue();
        if (count % 7 != 0) {
            if (startW == 6) {
                count -= 1;
            } else if (endW == 6) {
                count -= 1;
            } else if (endW < startW) {
                count -= 2;
            }
        }
        count = count - 2 * (long) (count / 7);
        List<SpecialOccasionsDTO> spo = specialOccasionsService.findForNowFac(startdate, Instant.now());
        LocalDateTime now = LocalDateTime.from(Instant.now().atZone(ZoneId.of("Z")));
        Set<LocalDateTime> holiday = new HashSet<>();
        for (SpecialOccasionsDTO var : spo) {
            LocalDateTime start = LocalDate.from(var.getStartDate().atZone(ZoneId.of("Z"))).atStartOfDay();
            LocalDateTime end = LocalDate.from(var.getStartDate().atZone(ZoneId.of("Z"))).plusDays(1).atStartOfDay();

            LocalDateTime iterator = start;
            while (iterator.isBefore(end) && iterator.isBefore(now)) {
                int dayOfWeek = iterator.getDayOfWeek().ordinal();
                if (dayOfWeek != 7 && dayOfWeek != 6) {
                    holiday.add(iterator);
                }
                iterator = iterator.plusDays(1);
            }
        }
        count -= holiday.size();
        return count;
    }

    public StudentCalc findForFaculty(String id) {
        Faculty faculty = facultyService.findRaw(id).get();
        String deviceID = faculty.getUser().getDeviceID();
        if (deviceID == null) {
            return null;
        }
        StudentCalc fac = new StudentCalc();
        fac.setSubjectName(id);
        fac.setAttendance((long) 0);
        List<Attendance> sadtos = attendanceService.findAllRawByDeviceID(deviceID);
        Optional<AcademicSessionDTO> as = academicSessionService.forNow(Instant.now());
        if (as.isPresent()) {
            Instant start = as.get().getStartDate();
            LocalTime endMarker = LocalTime.of(10, 0);
            sadtos.forEach(sa -> {
                LocalDateTime time = LocalDateTime.from(sa.getTimestamp().atZone(ZoneId.of("Z")));
                int att = time.toLocalTime().plusHours(5).plusMinutes(30).toSecondOfDay();
                if (sa.getTimestamp().isAfter(start) && att < endMarker.toSecondOfDay()) {
                    fac.setAttendance(fac.getAttendance() + 1);
                }
            });
            fac.setTotalAttendance(returnNumberOfWorkingDaysForFaculty());
            return fac;
        } else {
            return null;
        }
    }

    public CalculatorService(AttendanceService attendanceService, AcademicSessionService academicSessionService,
            TimeTableService timeTableService, SpecialOccasionsService specialOccasionsService, UserService userService,
            StudentService studentService, HODService hodService, FacultyService facultyService) {
        this.attendanceService = attendanceService;
        this.academicSessionService = academicSessionService;
        this.timeTableService = timeTableService;
        this.specialOccasionsService = specialOccasionsService;
        this.userService = userService;
        this.studentService = studentService;
        this.hodService = hodService;
        this.facultyService = facultyService;
    }
}
