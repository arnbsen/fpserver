package com.cse.repository;

import java.util.Optional;

import com.cse.domain.HOD;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the HOD entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HODRepository extends MongoRepository<HOD, String> {

    @Query(value = "{'user.id' : ?0}")
    Optional<HOD> findByUserID(String id);
}
