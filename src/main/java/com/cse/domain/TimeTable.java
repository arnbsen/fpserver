package com.cse.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TimeTable.
 */
@Document(collection = "time_table")
public class TimeTable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("year")
    private Integer year;

    @Field("semester")
    private Integer semester;

    @DBRef
    @Field("department")
    private Department department;

    @DBRef
    @Field("dayTimeTable")
    private Set<DayTimeTable> dayTimeTables = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getYear() {
        return year;
    }

    public TimeTable year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getSemester() {
        return semester;
    }

    public TimeTable semester(Integer semester) {
        this.semester = semester;
        return this;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Department getDepartment() {
        return department;
    }

    public TimeTable department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Set<DayTimeTable> getDayTimeTables() {
        return dayTimeTables;
    }

    public TimeTable dayTimeTables(Set<DayTimeTable> dayTimeTables) {
        this.dayTimeTables = dayTimeTables;
        return this;
    }

    public TimeTable addDayTimeTable(DayTimeTable dayTimeTable) {
        this.dayTimeTables.add(dayTimeTable);
        dayTimeTable.setTimeTable(this);
        return this;
    }

    public TimeTable removeDayTimeTable(DayTimeTable dayTimeTable) {
        this.dayTimeTables.remove(dayTimeTable);
        dayTimeTable.setTimeTable(null);
        return this;
    }

    public void setDayTimeTables(Set<DayTimeTable> dayTimeTables) {
        this.dayTimeTables = dayTimeTables;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TimeTable)) {
            return false;
        }
        return id != null && id.equals(((TimeTable) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TimeTable{" +
            "id=" + getId() +
            ", year=" + getYear() +
            ", semester=" + getSemester() +
            "}";
    }
}
