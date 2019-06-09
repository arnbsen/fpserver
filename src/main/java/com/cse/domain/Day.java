package com.cse.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import com.cse.domain.enumeration.DayType;

import com.cse.domain.enumeration.DayOfWeek;

/**
 * A Day.
 */
@Document(collection = "day")
public class Day implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("type")
    private DayType type;

    @Field("day_of_the_week")
    private DayOfWeek dayOfTheWeek;

    @Field("date")
    private Instant date;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public DayType getType() {
        return type;
    }

    public Day type(DayType type) {
        this.type = type;
        return this;
    }

    public void setType(DayType type) {
        this.type = type;
    }

    public DayOfWeek getDayOfTheWeek() {
        return dayOfTheWeek;
    }

    public Day dayOfTheWeek(DayOfWeek dayOfTheWeek) {
        this.dayOfTheWeek = dayOfTheWeek;
        return this;
    }

    public void setDayOfTheWeek(DayOfWeek dayOfTheWeek) {
        this.dayOfTheWeek = dayOfTheWeek;
    }

    public Instant getDate() {
        return date;
    }

    public Day date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Day)) {
            return false;
        }
        return id != null && id.equals(((Day) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Day{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", dayOfTheWeek='" + getDayOfTheWeek() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
