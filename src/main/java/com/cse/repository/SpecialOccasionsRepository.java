package com.cse.repository;

import com.cse.domain.SpecialOccasions;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the SpecialOccasions entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpecialOccasionsRepository extends MongoRepository<SpecialOccasions, String> {

}
