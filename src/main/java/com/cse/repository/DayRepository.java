package com.cse.repository;

import com.cse.domain.Day;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Day entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DayRepository extends MongoRepository<Day, String> {

}
