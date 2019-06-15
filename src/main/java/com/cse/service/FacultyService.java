package com.cse.service;

import com.cse.service.dto.FacultyDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.Faculty}.
 */
public interface FacultyService {

    /**
     * Save a faculty.
     *
     * @param facultyDTO the entity to save.
     * @return the persisted entity.
     */
    FacultyDTO save(FacultyDTO facultyDTO);

    /**
     * Get all the faculties.
     *
     * @return the list of entities.
     */
    List<FacultyDTO> findAll();

    /**
     * Get all the faculties with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<FacultyDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" faculty.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FacultyDTO> findOne(String id);

    /**
     * Delete the "id" faculty.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
