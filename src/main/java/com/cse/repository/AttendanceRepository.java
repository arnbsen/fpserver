package com.cse.repository;

import java.time.Instant;
import java.util.List;

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

    @Query(value = "{timestamp: {$gte: ?1},device_id: ?0}")
    public List<Attendance> filterByDate(String deviceID, Instant startDate);
}
