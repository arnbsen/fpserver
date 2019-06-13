package com.cse.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.cse.domain.enumeration.DeviceLocation;

/**
 * A DTO for the {@link com.cse.domain.Device} entity.
 */
public class DeviceDTO implements Serializable {

    private String id;

    @NotNull
    private String deviceID;

    private Long lastUpdated;

    @NotNull
    private DeviceLocation location;

    @NotNull
    private Integer locationSerial;

    private String userId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeviceID() {
        return deviceID;
    }

    public void setDeviceID(String deviceID) {
        this.deviceID = deviceID;
    }

    public Long getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Long lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public DeviceLocation getLocation() {
        return location;
    }

    public void setLocation(DeviceLocation location) {
        this.location = location;
    }

    public Integer getLocationSerial() {
        return locationSerial;
    }

    public void setLocationSerial(Integer locationSerial) {
        this.locationSerial = locationSerial;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DeviceDTO deviceDTO = (DeviceDTO) o;
        if (deviceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), deviceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DeviceDTO{" +
            "id=" + getId() +
            ", deviceID='" + getDeviceID() + "'" +
            ", lastUpdated=" + getLastUpdated() +
            ", location='" + getLocation() + "'" +
            ", locationSerial=" + getLocationSerial() +
            "}";
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
