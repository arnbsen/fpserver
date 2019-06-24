package com.cse.service;

import com.cse.domain.HOD;
import com.cse.service.dto.HODDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.HOD}.
 */
public interface HODService {

    /**
     * Save a hOD.
     *
     * @param hODDTO the entity to save.
     * @return the persisted entity.
     */
    HODDTO save(HODDTO hODDTO);

    /**
     * Get all the hODS.
     *
     * @return the list of entities.
     */
    List<HODDTO> findAll();


    /**
     * Get the "id" hOD.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HODDTO> findOne(String id);

    /**
     * Delete the "id" hOD.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    Optional<HODDTO> findByUserID(String id);

    Optional<HOD> findRaw(String id);

    Optional<HODDTO> findByDepartment(String id);
}
