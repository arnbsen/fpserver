package com.cse.repository;

import com.cse.domain.Faculty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Faculty entity.
 */
@Repository
public interface FacultyRepository extends MongoRepository<Faculty, String> {

    @Query("{}")
    Page<Faculty> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Faculty> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Faculty> findOneWithEagerRelationships(String id);

}
