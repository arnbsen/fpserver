package com.cse.service.impl;

import com.cse.service.AttendanceService;
import com.cse.domain.Attendance;
import com.cse.repository.AttendanceRepository;
import com.cse.service.dto.AttendanceDTO;
import com.cse.service.mapper.AttendanceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Attendance}.
 */
@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final Logger log = LoggerFactory.getLogger(AttendanceServiceImpl.class);

    private final AttendanceRepository attendanceRepository;

    private final AttendanceMapper attendanceMapper;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepository, AttendanceMapper attendanceMapper) {
        this.attendanceRepository = attendanceRepository;
        this.attendanceMapper = attendanceMapper;
    }

    /**
     * Save a attendance.
     *
     * @param attendanceDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AttendanceDTO save(AttendanceDTO attendanceDTO) {
        log.debug("Request to save Attendance : {}", attendanceDTO);
        Attendance attendance = attendanceMapper.toEntity(attendanceDTO);
        attendance = attendanceRepository.save(attendance);
        return attendanceMapper.toDto(attendance);
    }

    /**
     * Get all the attendances.
     *
     * @return the list of entities.
     */
    @Override
    public List<AttendanceDTO> findAll() {
        log.debug("Request to get all Attendances");
        return attendanceRepository.findAll().stream().map(attendanceMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one attendance by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<AttendanceDTO> findOne(String id) {
        log.debug("Request to get Attendance : {}", id);
        return attendanceRepository.findById(id).map(attendanceMapper::toDto);
    }

    /**
     * Delete the attendance by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Attendance : {}", id);
        attendanceRepository.deleteById(id);
    }

    @Override
    public boolean saveAll(List<AttendanceDTO> attendances) {
        attendances.forEach(action -> {
            attendanceRepository.save(attendanceMapper.toEntity(action));
        });
        return true;
    }

    @Override
    public List<AttendanceDTO> getByDeviceID(String deviceID) {
        return attendanceMapper.toDto(attendanceRepository.findAllByDeviceID(deviceID));
    }

    @Override
    public List<Attendance> findAllRawByDeviceID(String deviceID) {
        return attendanceRepository.findAllByDeviceID(deviceID);
    }

    @Override
    public List<Attendance> findAllRawByStartDate(String deviceID, Instant startDate) {
        return attendanceRepository.filterByDate(deviceID, startDate);
    }
}
