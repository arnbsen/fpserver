package com.cse.service.dto;
import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.cse.domain.enumeration.DayType;
import com.cse.domain.enumeration.DayOfWeek;

/**
 * A DTO for the {@link com.cse.domain.Day} entity.
 */
public class DayDTO implements Serializable {

    private String id;

    private DayType type;

    private DayOfWeek dayOfTheWeek;

    private Instant date;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public DayType getType() {
        return type;
    }

    public void setType(DayType type) {
        this.type = type;
    }

    public DayOfWeek getDayOfTheWeek() {
        return dayOfTheWeek;
    }

    public void setDayOfTheWeek(DayOfWeek dayOfTheWeek) {
        this.dayOfTheWeek = dayOfTheWeek;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DayDTO dayDTO = (DayDTO) o;
        if (dayDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dayDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DayDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", dayOfTheWeek='" + getDayOfTheWeek() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
