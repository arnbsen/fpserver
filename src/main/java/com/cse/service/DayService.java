package com.cse.service;

import com.cse.service.dto.DayDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.Day}.
 */
public interface DayService {

    /**
     * Save a day.
     *
     * @param dayDTO the entity to save.
     * @return the persisted entity.
     */
    DayDTO save(DayDTO dayDTO);

    /**
     * Get all the days.
     *
     * @return the list of entities.
     */
    List<DayDTO> findAll();


    /**
     * Get the "id" day.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DayDTO> findOne(String id);

    /**
     * Delete the "id" day.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
