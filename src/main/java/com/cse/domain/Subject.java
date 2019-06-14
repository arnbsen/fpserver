package com.cse.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Subject.
 */
@Document(collection = "subject")
public class Subject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("subject_code")
    private String subjectCode;

    @NotNull
    @Field("subject_name")
    private String subjectName;

    @NotNull
    @Field("year")
    private Integer year;

    @NotNull
    @Field("semester")
    private Integer semester;

    @DBRef
    @Field("hod")
    @JsonIgnoreProperties("subjects")
    private HOD hod;

    @DBRef
    @Field("ofDept")
    private Department ofDept;

    @DBRef
    @Field("faculty")
    @JsonIgnoreProperties("subjects")
    private Faculty faculty;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public Subject subjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
        return this;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public Subject subjectName(String subjectName) {
        this.subjectName = subjectName;
        return this;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Integer getYear() {
        return year;
    }

    public Subject year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getSemester() {
        return semester;
    }

    public Subject semester(Integer semester) {
        this.semester = semester;
        return this;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public HOD gethod() {
        return hod;
    }

    public Subject hod(HOD hod) {
        this.hod = hod;
        return this;
    }

    public void sethod(HOD hod) {
        this.hod = hod;
    }

    public Department getOfDept() {
        return ofDept;
    }

    public Subject ofDept(Department department) {
        this.ofDept = department;
        return this;
    }

    public void setOfDept(Department department) {
        this.ofDept = department;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public Subject faculty(Faculty faculty) {
        this.faculty = faculty;
        return this;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subject)) {
            return false;
        }
        return id != null && id.equals(((Subject) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", subjectCode='" + getSubjectCode() + "'" +
            ", subjectName='" + getSubjectName() + "'" +
            ", year=" + getYear() +
            ", semester=" + getSemester() +
            "}";
    }
}
