package com.cse.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.cse.domain.enumeration.DayType;

/**
 * A SpecialOccasions.
 */
@Document(collection = "special_occasions")
public class SpecialOccasions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("date")
    private Instant date;

    @Field("type")
    private DayType type;

    @Field("description")
    private String description;

    @DBRef
    @Field("academicSession")
    @JsonIgnoreProperties("specialOccasions")
    private AcademicSession academicSession;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public SpecialOccasions date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public DayType getType() {
        return type;
    }

    public SpecialOccasions type(DayType type) {
        this.type = type;
        return this;
    }

    public void setType(DayType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public SpecialOccasions description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AcademicSession getAcademicSession() {
        return academicSession;
    }

    public SpecialOccasions academicSession(AcademicSession academicSession) {
        this.academicSession = academicSession;
        return this;
    }

    public void setAcademicSession(AcademicSession academicSession) {
        this.academicSession = academicSession;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SpecialOccasions)) {
            return false;
        }
        return id != null && id.equals(((SpecialOccasions) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SpecialOccasions{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", type='" + getType() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
