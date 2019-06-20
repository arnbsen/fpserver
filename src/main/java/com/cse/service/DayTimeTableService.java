package com.cse.service;

import com.cse.service.dto.DayTimeTableDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.DayTimeTable}.
 */
public interface DayTimeTableService {

    /**
     * Save a dayTimeTable.
     *
     * @param dayTimeTableDTO the entity to save.
     * @return the persisted entity.
     */
    DayTimeTableDTO save(DayTimeTableDTO dayTimeTableDTO);

    /**
     * Get all the dayTimeTables.
     *
     * @return the list of entities.
     */
    List<DayTimeTableDTO> findAll();


    /**
     * Get the "id" dayTimeTable.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DayTimeTableDTO> findOne(String id);

    /**
     * Delete the "id" dayTimeTable.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    List<DayTimeTableDTO> saveBatch(List<DayTimeTableDTO> daytimetable);
}
