package com.cse.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A HOD.
 */
@Document(collection = "hod")
public class HOD implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("auth_code")
    private String authCode;

    @DBRef
    @Field("department")
    private Department department;

    @DBRef
    @Field("user")
    private User user;

    @DBRef
    @Field("subjectTaking")
    private Set<Subject> subjectTakings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthCode() {
        return authCode;
    }

    public HOD authCode(String authCode) {
        this.authCode = authCode;
        return this;
    }

    public void setAuthCode(String authCode) {
        this.authCode = authCode;
    }

    public Department getDepartment() {
        return department;
    }

    public HOD department(Department department) {
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
        if (!(o instanceof HOD)) {
            return false;
        }
        return id != null && id.equals(((HOD) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "HOD{" +
            "id=" + getId() +
            ", authCode='" + getAuthCode() + "'" +
            "}";
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Subject> getSubjectTakings() {
        return subjectTakings;
    }

    public void setSubjectTakings(Set<Subject> subjectTakings) {
        this.subjectTakings = subjectTakings;
    }
}
