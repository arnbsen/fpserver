package com.cse.service.impl;

import com.cse.service.FacultyService;
import com.cse.domain.Authority;
import com.cse.domain.Faculty;
import com.cse.domain.User;
import com.cse.repository.FacultyRepository;
import com.cse.repository.UserRepository;
import com.cse.service.dto.FacultyDTO;
import com.cse.service.mapper.FacultyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Faculty}.
 */
@Service
public class FacultyServiceImpl implements FacultyService {

    private final Logger log = LoggerFactory.getLogger(FacultyServiceImpl.class);

    private final FacultyRepository facultyRepository;

    private final FacultyMapper facultyMapper;

    private final UserRepository userRepository;

    public FacultyServiceImpl(FacultyRepository facultyRepository, FacultyMapper facultyMapper, UserRepository userRepository) {
        this.facultyRepository = facultyRepository;
        this.facultyMapper = facultyMapper;
        this.userRepository = userRepository;
    }

    /**
     * Save a faculty.
     *
     * @param facultyDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public FacultyDTO save(FacultyDTO facultyDTO) {
        log.debug("Request to save Faculty : {}", facultyDTO);
        Faculty faculty = facultyMapper.toEntity(facultyDTO);
        User user = userRepository.findById(faculty.getUser().getId()).get();
        Set<Authority> auth = faculty.getUser().getAuthorities();
        Authority authr = new Authority();
        authr.setName("ROLE_USER");
        auth.add(authr);
        authr = new Authority();
        authr.setName("ROLE_FACULTY");
        auth.add(authr);
        user.setAuthorities(auth);
        userRepository.save(user);
        user = userRepository.save(user);
        faculty = facultyRepository.save(faculty);
        return facultyMapper.toDto(faculty);
    }

    /**
     * Get all the faculties.
     *
     * @return the list of entities.
     */
    @Override
    public List<FacultyDTO> findAll() {
        log.debug("Request to get all Faculties");
        return facultyRepository.findAll().stream()
            .map(facultyMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one faculty by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<FacultyDTO> findOne(String id) {
        log.debug("Request to get Faculty : {}", id);
        return facultyRepository.findById(id)
            .map(facultyMapper::toDto);
    }

    /**
     * Delete the faculty by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Faculty : {}", id);
        facultyRepository.deleteById(id);
    }
}
