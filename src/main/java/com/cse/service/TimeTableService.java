package com.cse.service;

import com.cse.domain.TimeTable;
import com.cse.service.dto.TimeTableDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.TimeTable}.
 */
public interface TimeTableService {

    /**
     * Save a timeTable.
     *
     * @param timeTableDTO the entity to save.
     * @return the persisted entity.
     */
    TimeTableDTO save(TimeTableDTO timeTableDTO);

    /**
     * Get all the timeTables.
     *
     * @return the list of entities.
     */
    List<TimeTableDTO> findAll();


    /**
     * Get the "id" timeTable.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TimeTableDTO> findOne(String id);

    /**
     * Delete the "id" timeTable.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    Optional<TimeTable> findOneOrg(String id);
}
