package com.cse.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Student.
 */
@Document(collection = "student")
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("year_joined")
    private Long yearJoined;

    @Field("current_year")
    private Integer currentYear;

    @Field("current_sem")
    private Integer currentSem;

    @Field("class_roll_number")
    private Integer classRollNumber;

    @Field("current_session")
    private String currentSession;

    @DBRef
    @Field("department")
    private Department department;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getYearJoined() {
        return yearJoined;
    }

    public Student yearJoined(Long yearJoined) {
        this.yearJoined = yearJoined;
        return this;
    }

    public void setYearJoined(Long yearJoined) {
        this.yearJoined = yearJoined;
    }

    public Integer getCurrentYear() {
        return currentYear;
    }

    public Student currentYear(Integer currentYear) {
        this.currentYear = currentYear;
        return this;
    }

    public void setCurrentYear(Integer currentYear) {
        this.currentYear = currentYear;
    }

    public Integer getCurrentSem() {
        return currentSem;
    }

    public Student currentSem(Integer currentSem) {
        this.currentSem = currentSem;
        return this;
    }

    public void setCurrentSem(Integer currentSem) {
        this.currentSem = currentSem;
    }

    public Integer getClassRollNumber() {
        return classRollNumber;
    }

    public Student classRollNumber(Integer classRollNumber) {
        this.classRollNumber = classRollNumber;
        return this;
    }

    public void setClassRollNumber(Integer classRollNumber) {
        this.classRollNumber = classRollNumber;
    }

    public String getCurrentSession() {
        return currentSession;
    }

    public Student currentSession(String currentSession) {
        this.currentSession = currentSession;
        return this;
    }

    public void setCurrentSession(String currentSession) {
        this.currentSession = currentSession;
    }

    public Department getDepartment() {
        return department;
    }

    public Student department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Student)) {
            return false;
        }
        return id != null && id.equals(((Student) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", yearJoined=" + getYearJoined() +
            ", currentYear=" + getCurrentYear() +
            ", currentSem=" + getCurrentSem() +
            ", classRollNumber=" + getClassRollNumber() +
            ", currentSession='" + getCurrentSession() + "'" +
            "}";
    }
}
