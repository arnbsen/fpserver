package com.cse.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Attendance.
 */
@Document(collection = "attendance")
public class Attendance implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("timestamp")
    private Instant timestamp;

    @Field("device_id")
    private String deviceID;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public Attendance timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getDeviceID() {
        return deviceID;
    }

    public Attendance deviceID(String deviceID) {
        this.deviceID = deviceID;
        return this;
    }

    public void setDeviceID(String deviceID) {
        this.deviceID = deviceID;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Attendance)) {
            return false;
        }
        return id != null && id.equals(((Attendance) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Attendance{" +
            "id=" + getId() +
            ", timestamp='" + getTimestamp() + "'" +
            ", deviceID='" + getDeviceID() + "'" +
            "}";
    }
}
