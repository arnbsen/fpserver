package com.cse.service.impl;

import com.cse.service.DayService;
import com.cse.domain.Day;
import com.cse.repository.DayRepository;
import com.cse.service.dto.DayDTO;
import com.cse.service.mapper.DayMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Day}.
 */
@Service
public class DayServiceImpl implements DayService {

    private final Logger log = LoggerFactory.getLogger(DayServiceImpl.class);

    private final DayRepository dayRepository;

    private final DayMapper dayMapper;

    public DayServiceImpl(DayRepository dayRepository, DayMapper dayMapper) {
        this.dayRepository = dayRepository;
        this.dayMapper = dayMapper;
    }

    /**
     * Save a day.
     *
     * @param dayDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DayDTO save(DayDTO dayDTO) {
        log.debug("Request to save Day : {}", dayDTO);
        Day day = dayMapper.toEntity(dayDTO);
        day = dayRepository.save(day);
        return dayMapper.toDto(day);
    }

    /**
     * Get all the days.
     *
     * @return the list of entities.
     */
    @Override
    public List<DayDTO> findAll() {
        log.debug("Request to get all Days");
        return dayRepository.findAll().stream()
            .map(dayMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one day by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<DayDTO> findOne(String id) {
        log.debug("Request to get Day : {}", id);
        return dayRepository.findById(id)
            .map(dayMapper::toDto);
    }

    /**
     * Delete the day by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Day : {}", id);
        dayRepository.deleteById(id);
    }
}
