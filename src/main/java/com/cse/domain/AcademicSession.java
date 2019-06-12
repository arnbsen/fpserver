package com.cse.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A AcademicSession.
 */
@Document(collection = "academic_session")
public class AcademicSession implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("academic_session")
    private String academicSession;

    @Field("start_date")
    private Instant startDate;

    @Field("end_date")
    private Instant endDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAcademicSession() {
        return academicSession;
    }

    public AcademicSession academicSession(String academicSession) {
        this.academicSession = academicSession;
        return this;
    }

    public void setAcademicSession(String academicSession) {
        this.academicSession = academicSession;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public AcademicSession startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public AcademicSession endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AcademicSession)) {
            return false;
        }
        return id != null && id.equals(((AcademicSession) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AcademicSession{" +
            "id=" + getId() +
            ", academicSession='" + getAcademicSession() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
