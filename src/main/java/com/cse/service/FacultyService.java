package com.cse.service;

import com.cse.domain.Faculty;
import com.cse.service.dto.FacultyDTO;

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

    Optional<FacultyDTO> findByUserID(String id);

    Optional<Faculty> findRaw(String id);

    List<Faculty> findByDepartment(String id);
}
