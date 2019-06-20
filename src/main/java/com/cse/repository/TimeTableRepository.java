package com.cse.repository;

import java.util.Optional;

import com.cse.domain.TimeTable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the TimeTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TimeTableRepository extends MongoRepository<TimeTable, String> {

   @Query(value = "{'year': ?0, 'semester': ?1, 'department.id': ?2}")
   Optional<TimeTable> customQuery(Integer year, Integer semester, String deptid);

}
