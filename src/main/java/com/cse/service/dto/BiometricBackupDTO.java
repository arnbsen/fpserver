package com.cse.service.dto;
import java.io.Serializable;
import java.util.Objects;
import com.cse.domain.enumeration.UserType;

/**
 * A DTO for the {@link com.cse.domain.BiometricBackup} entity.
 */
public class BiometricBackupDTO implements Serializable {

    private String id;

    private UserType forUserType;

    private String identifier;

    private byte[] jsonFile;

    private String jsonFileContentType;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public UserType getForUserType() {
        return forUserType;
    }

    public void setForUserType(UserType forUserType) {
        this.forUserType = forUserType;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public byte[] getJsonFile() {
        return jsonFile;
    }

    public void setJsonFile(byte[] jsonFile) {
        this.jsonFile = jsonFile;
    }

    public String getJsonFileContentType() {
        return jsonFileContentType;
    }

    public void setJsonFileContentType(String jsonFileContentType) {
        this.jsonFileContentType = jsonFileContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BiometricBackupDTO biometricBackupDTO = (BiometricBackupDTO) o;
        if (biometricBackupDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), biometricBackupDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BiometricBackupDTO{" +
            "id=" + getId() +
            ", forUserType='" + getForUserType() + "'" +
            ", identifier='" + getIdentifier() + "'" +
            ", jsonFile='" + getJsonFile() + "'" +
            "}";
    }
}
