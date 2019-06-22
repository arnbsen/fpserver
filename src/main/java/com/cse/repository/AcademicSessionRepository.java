package com.cse.repository;

import java.time.Instant;
import java.util.Optional;

import com.cse.domain.AcademicSession;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the AcademicSession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcademicSessionRepository extends MongoRepository<AcademicSession, String> {
    @Query(value = "{start_date: {$lte: ?0}, end_date: {$gte: ?0}}")
    Optional<AcademicSession> forNow(Instant date);
}
