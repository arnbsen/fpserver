package com.cse.service.dto;
import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;
import com.cse.domain.enumeration.DayType;

/**
 * A DTO for the {@link com.cse.domain.SpecialOccasions} entity.
 */
public class SpecialOccasionsDTO implements Serializable {

    private String id;

    private Instant date;

    private DayType type;

    private String description;


    private String academicSessionId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public DayType getType() {
        return type;
    }

    public void setType(DayType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAcademicSessionId() {
        return academicSessionId;
    }

    public void setAcademicSessionId(String academicSessionId) {
        this.academicSessionId = academicSessionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SpecialOccasionsDTO specialOccasionsDTO = (SpecialOccasionsDTO) o;
        if (specialOccasionsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), specialOccasionsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SpecialOccasionsDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", type='" + getType() + "'" +
            ", description='" + getDescription() + "'" +
            ", academicSession=" + getAcademicSessionId() +
            "}";
    }
}
