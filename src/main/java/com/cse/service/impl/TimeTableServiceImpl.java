package com.cse.service.impl;

import com.cse.service.TimeTableService;
import com.cse.domain.TimeTable;
import com.cse.repository.TimeTableRepository;
import com.cse.service.dto.TimeTableDTO;
import com.cse.service.mapper.TimeTableMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link TimeTable}.
 */
@Service
public class TimeTableServiceImpl implements TimeTableService {

    private final Logger log = LoggerFactory.getLogger(TimeTableServiceImpl.class);

    private final TimeTableRepository timeTableRepository;

    private final TimeTableMapper timeTableMapper;

    public TimeTableServiceImpl(TimeTableRepository timeTableRepository, TimeTableMapper timeTableMapper) {
        this.timeTableRepository = timeTableRepository;
        this.timeTableMapper = timeTableMapper;
    }

    /**
     * Save a timeTable.
     *
     * @param timeTableDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TimeTableDTO save(TimeTableDTO timeTableDTO) {
        log.debug("Request to save TimeTable : {}", timeTableDTO);
        TimeTable timeTable = timeTableMapper.toEntity(timeTableDTO);
        timeTable = timeTableRepository.save(timeTable);
        return timeTableMapper.toDto(timeTable);
    }

    /**
     * Get all the timeTables.
     *
     * @return the list of entities.
     */
    @Override
    public List<TimeTableDTO> findAll() {
        log.debug("Request to get all TimeTables");
        return timeTableRepository.findAll().stream()
            .map(timeTableMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one timeTable by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<TimeTableDTO> findOne(String id) {
        log.debug("Request to get TimeTable : {}", id);
        return timeTableRepository.findById(id)
            .map(timeTableMapper::toDto);
    }

    /**
     * Delete the timeTable by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete TimeTable : {}", id);
        timeTableRepository.deleteById(id);
    }

    @Override
    public Optional<TimeTable> findOneOrg(String id) {
        Optional<TimeTable> tt = timeTableRepository.findById(id);
        if (tt.isPresent()) {
            tt.get().getDayTimeTables().forEach(action -> {
                action.getSubjects().forEach(ac1 -> {

                    ac1.getSubject().getFaculties().forEach(fac -> {
                        fac.setDepartment(null);
                        fac.setUser(null);
                    });
                    ac1.getSubject().setOfDept(null);
                });
            });
        }
        return tt;
    }

    @Override
    public Optional<TimeTable> findBySemYearDept(TimeTableDTO dto) {
        Optional<TimeTable> tOptional = timeTableRepository.customQuery(dto.getYear(), dto.getSemester() ,dto.getDepartmentId());
        if (tOptional.isPresent()) {
            tOptional.get().getDayTimeTables().forEach(action -> {
                action.getSubjects().forEach(ac1 -> {

                    ac1.getSubject().getFaculties().forEach(fac -> {
                        fac.setDepartment(null);
                        fac.setUser(null);
                    });
                    ac1.getSubject().setOfDept(null);
                });
            });
        }
        return tOptional;
    }
}
