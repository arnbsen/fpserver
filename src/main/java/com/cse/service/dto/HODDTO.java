package com.cse.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.cse.domain.HOD} entity.
 */
public class HODDTO implements Serializable {

    private String id;

    private String authCode;


    private String departmentId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthCode() {
        return authCode;
    }

    public void setAuthCode(String authCode) {
        this.authCode = authCode;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HODDTO hODDTO = (HODDTO) o;
        if (hODDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hODDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HODDTO{" +
            "id=" + getId() +
            ", authCode='" + getAuthCode() + "'" +
            ", department=" + getDepartmentId() +
            "}";
    }
}
