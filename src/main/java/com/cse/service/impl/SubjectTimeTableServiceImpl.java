package com.cse.service.impl;

import com.cse.service.SubjectTimeTableService;
import com.cse.domain.SubjectTimeTable;
import com.cse.repository.SubjectTimeTableRepository;
import com.cse.service.dto.SubjectTimeTableDTO;
import com.cse.service.mapper.SubjectTimeTableMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link SubjectTimeTable}.
 */
@Service
public class SubjectTimeTableServiceImpl implements SubjectTimeTableService {

    private final Logger log = LoggerFactory.getLogger(SubjectTimeTableServiceImpl.class);

    private final SubjectTimeTableRepository subjectTimeTableRepository;

    private final SubjectTimeTableMapper subjectTimeTableMapper;

    public SubjectTimeTableServiceImpl(SubjectTimeTableRepository subjectTimeTableRepository, SubjectTimeTableMapper subjectTimeTableMapper) {
        this.subjectTimeTableRepository = subjectTimeTableRepository;
        this.subjectTimeTableMapper = subjectTimeTableMapper;
    }

    /**
     * Save a subjectTimeTable.
     *
     * @param subjectTimeTableDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public SubjectTimeTableDTO save(SubjectTimeTableDTO subjectTimeTableDTO) {
        log.debug("Request to save SubjectTimeTable : {}", subjectTimeTableDTO);
        SubjectTimeTable subjectTimeTable = subjectTimeTableMapper.toEntity(subjectTimeTableDTO);
        subjectTimeTable = subjectTimeTableRepository.save(subjectTimeTable);
        return subjectTimeTableMapper.toDto(subjectTimeTable);
    }

    /**
     * Get all the subjectTimeTables.
     *
     * @return the list of entities.
     */
    @Override
    public List<SubjectTimeTableDTO> findAll() {
        log.debug("Request to get all SubjectTimeTables");
        return subjectTimeTableRepository.findAll().stream()
            .map(subjectTimeTableMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one subjectTimeTable by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<SubjectTimeTableDTO> findOne(String id) {
        log.debug("Request to get SubjectTimeTable : {}", id);
        return subjectTimeTableRepository.findById(id)
            .map(subjectTimeTableMapper::toDto);
    }

    /**
     * Delete the subjectTimeTable by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete SubjectTimeTable : {}", id);
        subjectTimeTableRepository.deleteById(id);
    }

    @Override
    public List<SubjectTimeTableDTO> saveAll(List<SubjectTimeTableDTO> subjectList) {
        List<SubjectTimeTable> returnVal = new ArrayList<>();
        subjectList.forEach(action -> {
            returnVal.add(subjectTimeTableRepository.save(subjectTimeTableMapper.toEntity(action)));
        });
        return subjectTimeTableMapper.toDto(returnVal);
    }

    @Override
    public List<SubjectTimeTable> filterbylocation(String devLoc) {
        return subjectTimeTableRepository.filterByLocationId(devLoc);
    }
}
