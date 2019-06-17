package com.cse.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.cse.domain.enumeration.DeviceLocation;

/**
 * A Device.
 */
@Document(collection = "device")
public class Device implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("last_updated")
    private Long lastUpdated;

    @NotNull
    @Field("location")
    private DeviceLocation location;

    @Field("location_name")
    private String locationName;

    @DBRef
    @Field("devLoc")
    private Location devLoc;

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

    public Long getLastUpdated() {
        return lastUpdated;
    }

    public Device lastUpdated(Long lastUpdated) {
        this.lastUpdated = lastUpdated;
        return this;
    }

    public void setLastUpdated(Long lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public DeviceLocation getLocation() {
        return location;
    }

    public Device location(DeviceLocation location) {
        this.location = location;
        return this;
    }

    public void setLocation(DeviceLocation location) {
        this.location = location;
    }

    public String getLocationName() {
        return locationName;
    }

    public Device locationName(String locationName) {
        this.locationName = locationName;
        return this;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public Location getDevLoc() {
        return devLoc;
    }

    public Device devLoc(Location location) {
        this.devLoc = location;
        return this;
    }

    public void setDevLoc(Location location) {
        this.devLoc = location;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Device)) {
            return false;
        }
        return id != null && id.equals(((Device) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Device{" +
            "id=" + getId() +
            ", lastUpdated=" + getLastUpdated() +
            ", location='" + getLocation() + "'" +
            ", locationName='" + getLocationName() + "'" +
            "}";
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
