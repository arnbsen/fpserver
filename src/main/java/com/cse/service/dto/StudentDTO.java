package com.cse.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.cse.domain.Student} entity.
 */
public class StudentDTO implements Serializable {

    private String id;

    private Long yearJoined;

    private Integer currentYear;

    private Integer currentSem;

    private Integer classRollNumber;

    private String currentSession;


    private String departmentId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getYearJoined() {
        return yearJoined;
    }

    public void setYearJoined(Long yearJoined) {
        this.yearJoined = yearJoined;
    }

    public Integer getCurrentYear() {
        return currentYear;
    }

    public void setCurrentYear(Integer currentYear) {
        this.currentYear = currentYear;
    }

    public Integer getCurrentSem() {
        return currentSem;
    }

    public void setCurrentSem(Integer currentSem) {
        this.currentSem = currentSem;
    }

    public Integer getClassRollNumber() {
        return classRollNumber;
    }

    public void setClassRollNumber(Integer classRollNumber) {
        this.classRollNumber = classRollNumber;
    }

    public String getCurrentSession() {
        return currentSession;
    }

    public void setCurrentSession(String currentSession) {
        this.currentSession = currentSession;
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

        StudentDTO studentDTO = (StudentDTO) o;
        if (studentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentDTO{" +
            "id=" + getId() +
            ", yearJoined=" + getYearJoined() +
            ", currentYear=" + getCurrentYear() +
            ", currentSem=" + getCurrentSem() +
            ", classRollNumber=" + getClassRollNumber() +
            ", currentSession='" + getCurrentSession() + "'" +
            ", department=" + getDepartmentId() +
            "}";
    }
}
