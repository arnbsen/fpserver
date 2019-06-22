package com.cse.service;

import com.cse.domain.AcademicSession;
import com.cse.service.dto.AcademicSessionDTO;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.AcademicSession}.
 */
public interface AcademicSessionService {

    /**
     * Save a academicSession.
     *
     * @param academicSessionDTO the entity to save.
     * @return the persisted entity.
     */
    AcademicSessionDTO save(AcademicSessionDTO academicSessionDTO);

    /**
     * Get all the academicSessions.
     *
     * @return the list of entities.
     */
    List<AcademicSessionDTO> findAll();


    /**
     * Get the "id" academicSession.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AcademicSessionDTO> findOne(String id);

    /**
     * Delete the "id" academicSession.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    Optional<AcademicSessionDTO> forNow(Instant instant);
}
