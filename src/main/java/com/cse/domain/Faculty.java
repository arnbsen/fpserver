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
 * A Faculty.
 */
@Document(collection = "faculty")
public class Faculty implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("faculty_code")
    private String facultyCode;

    @DBRef
    @Field("department")
    private Department department;

    @DBRef
    @Field("subjectsTaking")
    private Set<Subject> subjectsTakings = new HashSet<>();

    @DBRef
    @Field("user")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFacultyCode() {
        return facultyCode;
    }

    public Faculty facultyCode(String facultyCode) {
        this.facultyCode = facultyCode;
        return this;
    }

    public void setFacultyCode(String facultyCode) {
        this.facultyCode = facultyCode;
    }

    public Department getDepartment() {
        return department;
    }

    public Faculty department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Set<Subject> getSubjectsTakings() {
        return subjectsTakings;
    }

    public Faculty subjectsTakings(Set<Subject> subjects) {
        this.subjectsTakings = subjects;
        return this;
    }

    public Faculty addSubjectsTaking(Subject subject) {
        this.subjectsTakings.add(subject);
        subject.setFaculty(this);
        return this;
    }

    public Faculty removeSubjectsTaking(Subject subject) {
        this.subjectsTakings.remove(subject);
        subject.setFaculty(null);
        return this;
    }

    public void setSubjectsTakings(Set<Subject> subjects) {
        this.subjectsTakings = subjects;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Faculty)) {
            return false;
        }
        return id != null && id.equals(((Faculty) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Faculty{" +
            "id=" + getId() +
            ", facultyCode='" + getFacultyCode() + "'" +
            "}";
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
