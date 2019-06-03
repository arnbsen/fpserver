package com.cse.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.cse.domain.Faculty} entity.
 */
public class FacultyDTO implements Serializable {

    private String id;

    private String facultyCode;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFacultyCode() {
        return facultyCode;
    }

    public void setFacultyCode(String facultyCode) {
        this.facultyCode = facultyCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FacultyDTO facultyDTO = (FacultyDTO) o;
        if (facultyDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), facultyDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FacultyDTO{" +
            "id=" + getId() +
            ", facultyCode='" + getFacultyCode() + "'" +
            "}";
    }
}
