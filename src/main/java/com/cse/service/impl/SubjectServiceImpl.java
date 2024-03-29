package com.cse.service.impl;

import com.cse.service.SubjectService;
import com.cse.domain.Subject;
import com.cse.repository.SubjectRepository;
import com.cse.service.dto.SubjectDTO;
import com.cse.service.mapper.SubjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Subject}.
 */
@Service
public class SubjectServiceImpl implements SubjectService {

    private final Logger log = LoggerFactory.getLogger(SubjectServiceImpl.class);

    private final SubjectRepository subjectRepository;

    private final SubjectMapper subjectMapper;

    public SubjectServiceImpl(SubjectRepository subjectRepository, SubjectMapper subjectMapper) {
        this.subjectRepository = subjectRepository;
        this.subjectMapper = subjectMapper;
    }

    /**
     * Save a subject.
     *
     * @param subjectDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public SubjectDTO save(SubjectDTO subjectDTO) {
        log.debug("Request to save Subject : {}", subjectDTO);
        Subject subject = subjectMapper.toEntity(subjectDTO);
        subject = subjectRepository.save(subject);
        return subjectMapper.toDto(subject);
    }

    /**
     * Get all the subjects.
     *
     * @return the list of entities.
     */
    @Override
    public List<SubjectDTO> findAll() {
        log.debug("Request to get all Subjects");
        return subjectRepository.findAll().stream()
            .map(subjectMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one subject by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<SubjectDTO> findOne(String id) {
        log.debug("Request to get Subject : {}", id);
        return subjectRepository.findById(id)
            .map(subjectMapper::toDto);
    }

    /**
     * Delete the subject by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Subject : {}", id);
        subjectRepository.deleteById(id);
    }

    @Override
    public Subject saveWithFaculty(Subject subject) {
        log.debug("Request to save Subject : {}", subject);
        return subjectRepository.save(subject);
    }

    @Override
    public List<SubjectDTO> findBySemesterAndYearAndDepartment(Integer year, Integer sem, String dept) {
        return subjectMapper.toDto(subjectRepository.findBySemesterAndYearAndDepartment(year, sem, dept));
    }

    @Override
    public List<SubjectDTO> findBySemesterAndYearAndDepartmentAndFacID(String fac) {
        List<SubjectDTO> ubs = new LinkedList<>();
        findAll().forEach(sub -> {
            sub.getFaculty().forEach(facm -> {
                if (facm.getFacultyCode().equals(fac)) {
                    ubs.add(sub);
                }
            });
        });
        return ubs;
    }
}
