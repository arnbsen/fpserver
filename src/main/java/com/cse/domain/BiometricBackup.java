package com.cse.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

import com.cse.domain.enumeration.UserType;

/**
 * A BiometricBackup.
 */
@Document(collection = "biometric_backup")
public class BiometricBackup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("for_user_type")
    private UserType forUserType;

    @Field("identifier")
    private String identifier;

    @Field("json_file")
    private byte[] jsonFile;

    @Field("json_file_content_type")
    private String jsonFileContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public UserType getForUserType() {
        return forUserType;
    }

    public BiometricBackup forUserType(UserType forUserType) {
        this.forUserType = forUserType;
        return this;
    }

    public void setForUserType(UserType forUserType) {
        this.forUserType = forUserType;
    }

    public String getIdentifier() {
        return identifier;
    }

    public BiometricBackup identifier(String identifier) {
        this.identifier = identifier;
        return this;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public byte[] getJsonFile() {
        return jsonFile;
    }

    public BiometricBackup jsonFile(byte[] jsonFile) {
        this.jsonFile = jsonFile;
        return this;
    }

    public void setJsonFile(byte[] jsonFile) {
        this.jsonFile = jsonFile;
    }

    public String getJsonFileContentType() {
        return jsonFileContentType;
    }

    public BiometricBackup jsonFileContentType(String jsonFileContentType) {
        this.jsonFileContentType = jsonFileContentType;
        return this;
    }

    public void setJsonFileContentType(String jsonFileContentType) {
        this.jsonFileContentType = jsonFileContentType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BiometricBackup)) {
            return false;
        }
        return id != null && id.equals(((BiometricBackup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "BiometricBackup{" +
            "id=" + getId() +
            ", forUserType='" + getForUserType() + "'" +
            ", identifier='" + getIdentifier() + "'" +
            ", jsonFile='" + getJsonFile() + "'" +
            ", jsonFileContentType='" + getJsonFileContentType() + "'" +
            "}";
    }
}
