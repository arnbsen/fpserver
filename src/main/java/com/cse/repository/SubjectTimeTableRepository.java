package com.cse.repository;

import com.cse.domain.SubjectTimeTable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the SubjectTimeTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubjectTimeTableRepository extends MongoRepository<SubjectTimeTable, String> {

}
