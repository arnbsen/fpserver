package com.cse.service;

import com.cse.service.dto.DepartmentDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.Department}.
 */
public interface DepartmentService {

    /**
     * Save a department.
     *
     * @param departmentDTO the entity to save.
     * @return the persisted entity.
     */
    DepartmentDTO save(DepartmentDTO departmentDTO);

    /**
     * Get all the departments.
     *
     * @return the list of entities.
     */
    List<DepartmentDTO> findAll();


    /**
     * Get the "id" department.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DepartmentDTO> findOne(String id);

    /**
     * Delete the "id" department.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
