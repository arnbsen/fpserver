package com.cse.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.cse.domain.enumeration.ClassType;

/**
 * A SubjectTimeTable.
 */
@Document(collection = "subject_time_table")
public class SubjectTimeTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("start_time")
    private Long startTime;

    @Field("end_time")
    private Long endTime;

    @Field("class_type")
    private ClassType classType;

    @DBRef
    @Field("location")
    private Location location;

    @DBRef
    @Field("subject")
    @JsonIgnoreProperties("subjectTimeTables")
    private Subject subject;

    @DBRef
    @Field("dayTimeTable")
    @JsonIgnoreProperties("subjects")
    private DayTimeTable dayTimeTable;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getStartTime() {
        return startTime;
    }

    public SubjectTimeTable startTime(Long startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Long getEndTime() {
        return endTime;
    }

    public SubjectTimeTable endTime(Long endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }

    public ClassType getClassType() {
        return classType;
    }

    public SubjectTimeTable classType(ClassType classType) {
        this.classType = classType;
        return this;
    }

    public void setClassType(ClassType classType) {
        this.classType = classType;
    }

    public Location getLocation() {
        return location;
    }

    public SubjectTimeTable location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Subject getSubject() {
        return subject;
    }

    public SubjectTimeTable subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public DayTimeTable getDayTimeTable() {
        return dayTimeTable;
    }

    public SubjectTimeTable dayTimeTable(DayTimeTable dayTimeTable) {
        this.dayTimeTable = dayTimeTable;
        return this;
    }

    public void setDayTimeTable(DayTimeTable dayTimeTable) {
        this.dayTimeTable = dayTimeTable;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubjectTimeTable)) {
            return false;
        }
        return id != null && id.equals(((SubjectTimeTable) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SubjectTimeTable{" +
            "id=" + getId() +
            ", startTime=" + getStartTime() +
            ", endTime=" + getEndTime() +
            ", classType='" + getClassType() + "'" +
            "}";
    }
}
