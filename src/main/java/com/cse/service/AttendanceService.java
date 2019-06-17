package com.cse.service;

import com.cse.service.dto.AttendanceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.Attendance}.
 */
public interface AttendanceService {

    /**
     * Save a attendance.
     *
     * @param attendanceDTO the entity to save.
     * @return the persisted entity.
     */
    AttendanceDTO save(AttendanceDTO attendanceDTO);

    /**
     * Get all the attendances.
     *
     * @return the list of entities.
     */
    List<AttendanceDTO> findAll();


    /**
     * Get the "id" attendance.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AttendanceDTO> findOne(String id);

    /**
     * Delete the "id" attendance.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
