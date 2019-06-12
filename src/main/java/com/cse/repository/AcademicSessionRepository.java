package com.cse.repository;

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

}
