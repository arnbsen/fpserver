package com.cse.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.cse.domain.enumeration.DayType;
import com.cse.domain.enumeration.DayOfWeek;

/**
 * A DTO for the {@link com.cse.domain.DayTimeTable} entity.
 */
public class DayTimeTableDTO implements Serializable {

    private String id;

    @NotNull
    private DayType dayType;

    @NotNull
    private DayOfWeek dayOfWeek;


    private String timeTableId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public DayType getDayType() {
        return dayType;
    }

    public void setDayType(DayType dayType) {
        this.dayType = dayType;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getTimeTableId() {
        return timeTableId;
    }

    public void setTimeTableId(String timeTableId) {
        this.timeTableId = timeTableId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DayTimeTableDTO dayTimeTableDTO = (DayTimeTableDTO) o;
        if (dayTimeTableDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dayTimeTableDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DayTimeTableDTO{" +
            "id=" + getId() +
            ", dayType='" + getDayType() + "'" +
            ", dayOfWeek='" + getDayOfWeek() + "'" +
            ", timeTable=" + getTimeTableId() +
            "}";
    }
}
