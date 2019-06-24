package com.cse.repository;

import java.util.List;

import com.cse.domain.Subject;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Subject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubjectRepository extends MongoRepository<Subject, String> {

    @Query(value = "{'year': ?0, 'semester': ?1, 'ofDept.id': ?2}")
    List<Subject> findBySemesterAndYearAndDepartment(Integer year, Integer sem, String dept);

    @Query(value = "{'faculty.facultyCode': ?0}")
    List<Subject> findBySemesterAndYearAndDepartmentAndFacID(String fac);
}
