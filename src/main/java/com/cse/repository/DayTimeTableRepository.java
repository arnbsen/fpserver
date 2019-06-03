package com.cse.repository;

import com.cse.domain.DayTimeTable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the DayTimeTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayTimeTableRepository extends MongoRepository<DayTimeTable, String> {

}
