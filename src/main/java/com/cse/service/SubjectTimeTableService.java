package com.cse.service;

import com.cse.service.dto.SubjectTimeTableDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.SubjectTimeTable}.
 */
public interface SubjectTimeTableService {

    /**
     * Save a subjectTimeTable.
     *
     * @param subjectTimeTableDTO the entity to save.
     * @return the persisted entity.
     */
    SubjectTimeTableDTO save(SubjectTimeTableDTO subjectTimeTableDTO);

    /**
     * Get all the subjectTimeTables.
     *
     * @return the list of entities.
     */
    List<SubjectTimeTableDTO> findAll();


    /**
     * Get the "id" subjectTimeTable.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SubjectTimeTableDTO> findOne(String id);

    /**
     * Delete the "id" subjectTimeTable.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    List<SubjectTimeTableDTO> saveAll(List<SubjectTimeTableDTO> subjectList);
}
