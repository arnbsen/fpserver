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

    private Long lastUpdated;

    @NotNull
    private DeviceLocation location;

    private String locationName;


    private String devLocId;

    private String userId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getDevLocId() {
        return devLocId;
    }

    public void setDevLocId(String locationId) {
        this.devLocId = locationId;
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
            ", lastUpdated=" + getLastUpdated() +
            ", location='" + getLocation() + "'" +
            ", locationName='" + getLocationName() + "'" +
            ", devLoc=" + getDevLocId() +
            "}";

    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
