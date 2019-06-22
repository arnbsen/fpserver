package com.cse.service.impl;

import com.cse.service.SpecialOccasionsService;
import com.cse.domain.SpecialOccasions;
import com.cse.repository.SpecialOccasionsRepository;
import com.cse.service.dto.AcademicSessionDTO;
import com.cse.service.dto.SpecialOccasionsDTO;
import com.cse.service.mapper.SpecialOccasionsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link SpecialOccasions}.
 */
@Service
public class SpecialOccasionsServiceImpl implements SpecialOccasionsService {

    private final Logger log = LoggerFactory.getLogger(SpecialOccasionsServiceImpl.class);

    private final SpecialOccasionsRepository specialOccasionsRepository;

    private final SpecialOccasionsMapper specialOccasionsMapper;

    public SpecialOccasionsServiceImpl(SpecialOccasionsRepository specialOccasionsRepository,
            SpecialOccasionsMapper specialOccasionsMapper) {
        this.specialOccasionsRepository = specialOccasionsRepository;
        this.specialOccasionsMapper = specialOccasionsMapper;
    }

    /**
     * Save a specialOccasions.
     *
     * @param specialOccasionsDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public SpecialOccasionsDTO save(SpecialOccasionsDTO specialOccasionsDTO) {
        log.debug("Request to save SpecialOccasions : {}", specialOccasionsDTO);
        SpecialOccasions specialOccasions = specialOccasionsMapper.toEntity(specialOccasionsDTO);
        specialOccasions = specialOccasionsRepository.save(specialOccasions);
        return specialOccasionsMapper.toDto(specialOccasions);
    }

    /**
     * Get all the specialOccasions.
     *
     * @return the list of entities.
     */
    @Override
    public List<SpecialOccasionsDTO> findAll() {
        log.debug("Request to get all SpecialOccasions");
        return specialOccasionsRepository.findAll().stream().map(specialOccasionsMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one specialOccasions by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<SpecialOccasionsDTO> findOne(String id) {
        log.debug("Request to get SpecialOccasions : {}", id);
        return specialOccasionsRepository.findById(id).map(specialOccasionsMapper::toDto);
    }

    /**
     * Delete the specialOccasions by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete SpecialOccasions : {}", id);
        specialOccasionsRepository.deleteById(id);
    }

    @Override
    public List<SpecialOccasionsDTO> findByAcademicSession(String dto) {
        return specialOccasionsMapper.toDto(specialOccasionsRepository.customFetch1(dto));
    }

    @Override
    public List<SpecialOccasionsDTO> findForNow(Instant st, Instant en) {
        return specialOccasionsMapper.toDto(specialOccasionsRepository.forNow(st, en));
    }

    @Override
    public Long noOfEventForDay(Instant ins) {
        return specialOccasionsRepository.noOfEventsForDay(ins);
    }
}
