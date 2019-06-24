package com.cse.repository;

import java.util.List;
import java.util.Optional;

import com.cse.domain.Student;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Student entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentRepository extends MongoRepository<Student, String> {

    @Query(value = "{'user.id' : ?0}")
    Optional<Student> findByUserID(String id);

    @Query(value = "{'department.id': ?0}")
    List<Student> findByDepartmentID(String id);

    @Query(value = "{'current_year': ?0, 'current_sem': ?1}")
    List<Student> findBySemesterAndYearAndDepartment(Integer year, Integer sem);
}
