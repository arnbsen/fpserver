package com.cse.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A IntermdiateUser.
 */
@Document(collection = "intermdiate_user")
public class IntermdiateUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("device_user_name")
    private String deviceUserName;

    @NotNull
    @Field("hardware_id")
    private String hardwareID;

    @Field("other_params")
    private String otherParams;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeviceUserName() {
        return deviceUserName;
    }

    public IntermdiateUser deviceUserName(String deviceUserName) {
        this.deviceUserName = deviceUserName;
        return this;
    }

    public void setDeviceUserName(String deviceUserName) {
        this.deviceUserName = deviceUserName;
    }

    public String getHardwareID() {
        return hardwareID;
    }

    public IntermdiateUser hardwareID(String hardwareID) {
        this.hardwareID = hardwareID;
        return this;
    }

    public void setHardwareID(String hardwareID) {
        this.hardwareID = hardwareID;
    }

    public String getOtherParams() {
        return otherParams;
    }

    public IntermdiateUser otherParams(String otherParams) {
        this.otherParams = otherParams;
        return this;
    }

    public void setOtherParams(String otherParams) {
        this.otherParams = otherParams;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IntermdiateUser)) {
            return false;
        }
        return id != null && id.equals(((IntermdiateUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "IntermdiateUser{" +
            "id=" + getId() +
            ", deviceUserName='" + getDeviceUserName() + "'" +
            ", hardwareID='" + getHardwareID() + "'" +
            ", otherParams='" + getOtherParams() + "'" +
            "}";
    }
}
