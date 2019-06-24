package com.cse.service;

import com.cse.domain.Student;
import com.cse.service.dto.StudentDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.Student}.
 */
public interface StudentService {

    /**
     * Save a student.
     *
     * @param studentDTO the entity to save.
     * @return the persisted entity.
     */
    StudentDTO save(StudentDTO studentDTO);

    /**
     * Get all the students.
     *
     * @return the list of entities.
     */
    List<StudentDTO> findAll();


    /**
     * Get the "id" student.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudentDTO> findOne(String id);

    /**
     * Delete the "id" student.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    Optional<StudentDTO> findByUserID(String id);

    Optional<Student> findRaw(String id);

    List<StudentDTO> findByDepartment(String id);

    List<StudentDTO> findBySemesterAndYearAndDepartment(Integer year, Integer sem, String dept);
}
