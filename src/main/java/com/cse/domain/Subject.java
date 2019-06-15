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
    @Field("ofDept")
    private Department ofDept;

    @DBRef
    @Field("faculty")
    private Set<Faculty> faculties = new HashSet<>();

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

    public Set<Faculty> getFaculties() {
        return faculties;
    }

    public Subject faculties(Set<Faculty> faculties) {
        this.faculties = faculties;
        return this;
    }

    public Subject addFaculty(Faculty faculty) {
        this.faculties.add(faculty);
        faculty.setSubject(this);
        return this;
    }

    public Subject removeFaculty(Faculty faculty) {
        this.faculties.remove(faculty);
        faculty.setSubject(null);
        return this;
    }

    public void setFaculties(Set<Faculty> faculties) {
        this.faculties = faculties;
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
