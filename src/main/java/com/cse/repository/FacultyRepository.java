package com.cse.repository;

import java.util.List;
import java.util.Optional;

import com.cse.domain.Faculty;
import com.cse.domain.User;


import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Faculty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacultyRepository extends MongoRepository<Faculty, String> {

    @Query(value = "{'user.id' : ?0}")
    Optional<Faculty> findByUserID(String id);

    @Query(value = "{'department.id': ?0}")
    List<Faculty> findByDepartmentID(String id);
}
