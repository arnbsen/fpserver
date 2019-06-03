package com.cse.service.impl;

import com.cse.service.DayTimeTableService;
import com.cse.domain.DayTimeTable;
import com.cse.repository.DayTimeTableRepository;
import com.cse.service.dto.DayTimeTableDTO;
import com.cse.service.mapper.DayTimeTableMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link DayTimeTable}.
 */
@Service
public class DayTimeTableServiceImpl implements DayTimeTableService {

    private final Logger log = LoggerFactory.getLogger(DayTimeTableServiceImpl.class);

    private final DayTimeTableRepository dayTimeTableRepository;

    private final DayTimeTableMapper dayTimeTableMapper;

    public DayTimeTableServiceImpl(DayTimeTableRepository dayTimeTableRepository, DayTimeTableMapper dayTimeTableMapper) {
        this.dayTimeTableRepository = dayTimeTableRepository;
        this.dayTimeTableMapper = dayTimeTableMapper;
    }

    /**
     * Save a dayTimeTable.
     *
     * @param dayTimeTableDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DayTimeTableDTO save(DayTimeTableDTO dayTimeTableDTO) {
        log.debug("Request to save DayTimeTable : {}", dayTimeTableDTO);
        DayTimeTable dayTimeTable = dayTimeTableMapper.toEntity(dayTimeTableDTO);
        dayTimeTable = dayTimeTableRepository.save(dayTimeTable);
        return dayTimeTableMapper.toDto(dayTimeTable);
    }

    /**
     * Get all the dayTimeTables.
     *
     * @return the list of entities.
     */
    @Override
    public List<DayTimeTableDTO> findAll() {
        log.debug("Request to get all DayTimeTables");
        return dayTimeTableRepository.findAll().stream()
            .map(dayTimeTableMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one dayTimeTable by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<DayTimeTableDTO> findOne(String id) {
        log.debug("Request to get DayTimeTable : {}", id);
        return dayTimeTableRepository.findById(id)
            .map(dayTimeTableMapper::toDto);
    }

    /**
     * Delete the dayTimeTable by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete DayTimeTable : {}", id);
        dayTimeTableRepository.deleteById(id);
    }
}
