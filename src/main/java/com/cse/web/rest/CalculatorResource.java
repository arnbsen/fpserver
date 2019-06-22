package com.cse.web.rest;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import com.cse.service.AcademicSessionService;
import com.cse.service.AttendanceService;
import com.cse.service.SpecialOccasionsService;
import com.cse.service.TimeTableService;
import com.cse.service.dto.AcademicSessionDTO;
import com.cse.service.dto.SpecialOccasionsDTO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CalculatorResource {
    private final AttendanceService attendanceService;
    private final AcademicSessionService academicSessionService;
    private final TimeTableService timeTableService;
    private final SpecialOccasionsService specialOccasionsService;

    public CalculatorResource(AttendanceService attendanceService, AcademicSessionService academicSessionService,
            TimeTableService timeTableService, SpecialOccasionsService specialOccasionsService) {
        this.attendanceService = attendanceService;
        this.academicSessionService = academicSessionService;
        this.timeTableService = timeTableService;
        this.specialOccasionsService = specialOccasionsService;
    }

    @GetMapping("/calc/twd")
    public Long returnNumberOfWorkingDays() {
        Optional<AcademicSessionDTO> as = academicSessionService.forNow(Instant.now());
        Instant startdate = as.get().getStartDate();
        Long count = Long.parseLong("0");
        count = ChronoUnit.DAYS.between(startdate, Instant.now());
        int startW = LocalDate.from(startdate.atZone(ZoneId.systemDefault())).getDayOfWeek().getValue();
        int endW = LocalDate.from(Instant.now().atZone(ZoneId.systemDefault())).getDayOfWeek().getValue();
        if (count % 7 != 0) {
            if (startW == 7) {
                count -= 1;
            } else if (endW == 7) {
                count -= 1;
            } else if (endW < startW) {
                count -= 2;
            }
        }
        count = count - 2 * (long) (count / 7);
        List <SpecialOccasionsDTO> spo = specialOccasionsService.findForNow(startdate, Instant.now());
        LocalDateTime now = LocalDateTime.from(Instant.now().atZone(ZoneId.systemDefault()));
        Set<LocalDateTime> holiday = new HashSet<>();
        for (SpecialOccasionsDTO var : spo) {
            LocalDateTime start = LocalDate.from(var.getStartDate().atZone(ZoneId.systemDefault())).atStartOfDay();
            LocalDateTime end = LocalDate.from(var.getStartDate().atZone(ZoneId.systemDefault())).plusDays(1).atStartOfDay();

            LocalDateTime iterator = start;
            while(iterator.isBefore(end) && iterator.isBefore(now)) {
                int dayOfWeek = iterator.getDayOfWeek().ordinal();
                if (dayOfWeek != 7 && dayOfWeek != 6){
                    holiday.add(iterator);
                }
                iterator = iterator.plusDays(1);
            }
        }
        count -= holiday.size();
        return count;
    }



}
