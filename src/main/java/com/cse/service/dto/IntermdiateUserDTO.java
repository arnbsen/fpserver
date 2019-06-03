package com.cse.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.cse.domain.IntermdiateUser} entity.
 */
public class IntermdiateUserDTO implements Serializable {

    private String id;

    @NotNull
    private String deviceUserName;

    @NotNull
    private String hardwareID;

    private String otherParams;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeviceUserName() {
        return deviceUserName;
    }

    public void setDeviceUserName(String deviceUserName) {
        this.deviceUserName = deviceUserName;
    }

    public String getHardwareID() {
        return hardwareID;
    }

    public void setHardwareID(String hardwareID) {
        this.hardwareID = hardwareID;
    }

    public String getOtherParams() {
        return otherParams;
    }

    public void setOtherParams(String otherParams) {
        this.otherParams = otherParams;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        IntermdiateUserDTO intermdiateUserDTO = (IntermdiateUserDTO) o;
        if (intermdiateUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), intermdiateUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IntermdiateUserDTO{" +
            "id=" + getId() +
            ", deviceUserName='" + getDeviceUserName() + "'" +
            ", hardwareID='" + getHardwareID() + "'" +
            ", otherParams='" + getOtherParams() + "'" +
            "}";
    }
}
