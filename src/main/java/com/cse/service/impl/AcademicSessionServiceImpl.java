package com.cse.service.impl;

import com.cse.service.AcademicSessionService;
import com.cse.domain.AcademicSession;
import com.cse.repository.AcademicSessionRepository;
import com.cse.service.dto.AcademicSessionDTO;
import com.cse.service.mapper.AcademicSessionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link AcademicSession}.
 */
@Service
public class AcademicSessionServiceImpl implements AcademicSessionService {

    private final Logger log = LoggerFactory.getLogger(AcademicSessionServiceImpl.class);

    private final AcademicSessionRepository academicSessionRepository;

    private final AcademicSessionMapper academicSessionMapper;

    public AcademicSessionServiceImpl(AcademicSessionRepository academicSessionRepository, AcademicSessionMapper academicSessionMapper) {
        this.academicSessionRepository = academicSessionRepository;
        this.academicSessionMapper = academicSessionMapper;
    }

    /**
     * Save a academicSession.
     *
     * @param academicSessionDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AcademicSessionDTO save(AcademicSessionDTO academicSessionDTO) {
        log.debug("Request to save AcademicSession : {}", academicSessionDTO);
        AcademicSession academicSession = academicSessionMapper.toEntity(academicSessionDTO);
        academicSession = academicSessionRepository.save(academicSession);
        return academicSessionMapper.toDto(academicSession);
    }

    /**
     * Get all the academicSessions.
     *
     * @return the list of entities.
     */
    @Override
    public List<AcademicSessionDTO> findAll() {
        log.debug("Request to get all AcademicSessions");
        return academicSessionRepository.findAll().stream()
            .map(academicSessionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one academicSession by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<AcademicSessionDTO> findOne(String id) {
        log.debug("Request to get AcademicSession : {}", id);
        return academicSessionRepository.findById(id)
            .map(academicSessionMapper::toDto);
    }

    /**
     * Delete the academicSession by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete AcademicSession : {}", id);
        academicSessionRepository.deleteById(id);
    }
}
