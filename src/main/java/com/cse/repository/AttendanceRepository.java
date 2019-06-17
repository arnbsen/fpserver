package com.cse.repository;

import java.util.*;

import com.cse.domain.Attendance;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Attendance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttendanceRepository extends MongoRepository<Attendance, String> {

    public List<Attendance> findAllByDeviceID(String deviceID);

}
