package com.cse.domain;

import java.io.Serializable;

public class StudentCalc implements Serializable {

    private static final long serialVersionUID = 1L;

    private String subjectName;

    private Long attendance;

    private Long totalAttendance;

    public StudentCalc() {
    }

    public StudentCalc(String subjectName, Long attendance, Long totalAttendance) {
        this.subjectName = subjectName;
        this.attendance = attendance;
        this.totalAttendance = totalAttendance;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Long getAttendance() {
        return attendance;
    }

    public void setAttendance(Long attendance) {
        this.attendance = attendance;
    }

    public Long getTotalAttendance() {
        return totalAttendance;
    }

    public void setTotalAttendance(Long totalAttendance) {
        this.totalAttendance = totalAttendance;
    }

    @Override
    public String toString() {
        return "{attendance: " + attendance + ", subjectName: " + subjectName + ", totalAttendance: "
                + totalAttendance + "}";
    }




}
