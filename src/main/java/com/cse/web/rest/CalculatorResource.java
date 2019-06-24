package com.cse.web.rest;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import com.cse.domain.Attendance;
import com.cse.domain.Student;
import com.cse.domain.StudentCalc;
import com.cse.domain.Subject;
import com.cse.domain.SubjectTimeTable;
import com.cse.domain.TimeTable;
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

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CalculatorResource {

    private final CalculatorService calculatorService;


    public CalculatorResource(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }


    @GetMapping("/calc/twd")
    public Long returnNumberOfWorkingDays() {
        return calculatorService.returnNumberOfWorkingDays();
    }

    @GetMapping("/calc/student/{id}")
    public List<StudentCalc> getStudentdAttendanceDetails(@PathVariable String id){
       return calculatorService.getStudentAttendanceDetails(id);
    }

    @GetMapping("/calc/faculty/{id}")
    public StudentCalc getFacAttendanceDetails(@PathVariable String id) {
        return calculatorService.findForFaculty(id);
    }

}
