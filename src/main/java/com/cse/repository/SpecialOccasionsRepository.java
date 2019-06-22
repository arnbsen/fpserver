package com.cse.repository;

import java.time.Instant;
import java.util.List;

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
    @Query(value = "{'academicSession.id' : ?0}")
    List<SpecialOccasions> customFetch1(String id);

    @Query(value = "{start_date: {$gte: ?0}, end_date: {$lte: ?1}}")
    List<SpecialOccasions> forNow(Instant st, Instant en);

    @Query(value = "{start_date: {$lte: ?0}, end_date: {$gte: ?0}}", count = true)
    Long noOfEventsForDay(Instant in);
}
