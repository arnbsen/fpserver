package com.cse.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.cse.domain.enumeration.DayType;

import com.cse.domain.enumeration.DayOfWeek;

/**
 * A DayTimeTable.
 */
@Document(collection = "day_time_table")
public class DayTimeTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("day_type")
    private DayType dayType;

    @NotNull
    @Field("day_of_week")
    private DayOfWeek dayOfWeek;

    @DBRef
    @Field("subjects")
    private Set<SubjectTimeTable> subjects = new HashSet<>();

    @DBRef
    @Field("timeTable")
    @JsonIgnoreProperties("dayTimeTables")
    private TimeTable timeTable;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public DayType getDayType() {
        return dayType;
    }

    public DayTimeTable dayType(DayType dayType) {
        this.dayType = dayType;
        return this;
    }

    public void setDayType(DayType dayType) {
        this.dayType = dayType;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public DayTimeTable dayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
        return this;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public Set<SubjectTimeTable> getSubjects() {
        return subjects;
    }

    public DayTimeTable subjects(Set<SubjectTimeTable> subjectTimeTables) {
        this.subjects = subjectTimeTables;
        return this;
    }

    public DayTimeTable addSubjects(SubjectTimeTable subjectTimeTable) {
        this.subjects.add(subjectTimeTable);
        subjectTimeTable.setDayTimeTable(this);
        return this;
    }

    public DayTimeTable removeSubjects(SubjectTimeTable subjectTimeTable) {
        this.subjects.remove(subjectTimeTable);
        subjectTimeTable.setDayTimeTable(null);
        return this;
    }

    public void setSubjects(Set<SubjectTimeTable> subjectTimeTables) {
        this.subjects = subjectTimeTables;
    }

    public TimeTable getTimeTable() {
        return timeTable;
    }

    public DayTimeTable timeTable(TimeTable timeTable) {
        this.timeTable = timeTable;
        return this;
    }

    public void setTimeTable(TimeTable timeTable) {
        this.timeTable = timeTable;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DayTimeTable)) {
            return false;
        }
        return id != null && id.equals(((DayTimeTable) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DayTimeTable{" +
            "id=" + getId() +
            ", dayType='" + getDayType() + "'" +
            ", dayOfWeek='" + getDayOfWeek() + "'" +
            "}";
    }
}
