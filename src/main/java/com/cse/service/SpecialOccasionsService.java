package com.cse.service;

import com.cse.service.dto.SpecialOccasionsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.SpecialOccasions}.
 */
public interface SpecialOccasionsService {

    /**
     * Save a specialOccasions.
     *
     * @param specialOccasionsDTO the entity to save.
     * @return the persisted entity.
     */
    SpecialOccasionsDTO save(SpecialOccasionsDTO specialOccasionsDTO);

    /**
     * Get all the specialOccasions.
     *
     * @return the list of entities.
     */
    List<SpecialOccasionsDTO> findAll();


    /**
     * Get the "id" specialOccasions.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SpecialOccasionsDTO> findOne(String id);

    /**
     * Delete the "id" specialOccasions.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
