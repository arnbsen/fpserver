package com.cse.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.cse.domain.enumeration.ClassType;

/**
 * A DTO for the {@link com.cse.domain.SubjectTimeTable} entity.
 */
public class SubjectTimeTableDTO implements Serializable {

    private String id;

    private Long startTime;

    private Long endTime;

    private ClassType classType;


    private String locationId;

    private String subjectId;

    private String dayTimeTableId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Long getEndTime() {
        return endTime;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }

    public ClassType getClassType() {
        return classType;
    }

    public void setClassType(ClassType classType) {
        this.classType = classType;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public String getDayTimeTableId() {
        return dayTimeTableId;
    }

    public void setDayTimeTableId(String dayTimeTableId) {
        this.dayTimeTableId = dayTimeTableId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubjectTimeTableDTO subjectTimeTableDTO = (SubjectTimeTableDTO) o;
        if (subjectTimeTableDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subjectTimeTableDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubjectTimeTableDTO{" +
            "id=" + getId() +
            ", startTime=" + getStartTime() +
            ", endTime=" + getEndTime() +
            ", classType='" + getClassType() + "'" +
            ", location=" + getLocationId() +
            ", subject=" + getSubjectId() +
            ", dayTimeTable=" + getDayTimeTableId() +
            "}";
    }
}
