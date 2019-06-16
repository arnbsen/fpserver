package com.cse.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.cse.domain.TimeTable} entity.
 */
public class TimeTableDTO implements Serializable {

    private String id;

    private Integer year;

    private Integer semester;


    private String departmentId;

    private Set<DayTimeTableDTO> dayTimeTables = new HashSet<>();


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TimeTableDTO timeTableDTO = (TimeTableDTO) o;
        if (timeTableDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), timeTableDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TimeTableDTO{" +
            "id=" + getId() +
            ", year=" + getYear() +
            ", semester=" + getSemester() +
            ", department=" + getDepartmentId() +
            "}";
    }

    public Set<DayTimeTableDTO> getDayTimeTables() {
        return dayTimeTables;
    }

    public void setDayTimeTables(Set<DayTimeTableDTO> dayTimeTables) {
        this.dayTimeTables = dayTimeTables;
    }
}
