package com.cse.service.impl;

import com.cse.service.HODService;
import com.cse.domain.Authority;
import com.cse.domain.HOD;
import com.cse.domain.User;
import com.cse.repository.HODRepository;
import com.cse.repository.UserRepository;
import com.cse.service.dto.HODDTO;
import com.cse.service.mapper.HODMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link HOD}.
 */
@Service
public class HODServiceImpl implements HODService {

    private final Logger log = LoggerFactory.getLogger(HODServiceImpl.class);

    private final HODRepository hODRepository;

    private final HODMapper hODMapper;

    private final UserRepository userRepository;

    public HODServiceImpl(HODRepository hODRepository, HODMapper hODMapper, UserRepository userRepository) {
        this.hODRepository = hODRepository;
        this.hODMapper = hODMapper;
        this.userRepository = userRepository;
    }

    /**
     * Save a hOD.
     *
     * @param hODDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public HODDTO save(HODDTO hODDTO) {
        log.debug("Request to save HOD : {}", hODDTO);
        HOD hOD = hODMapper.toEntity(hODDTO);
        User user = userRepository.findById(hOD.getUser().getId()).get();
        Set<Authority> auth = hOD.getUser().getAuthorities();
        Authority authr = new Authority();
        authr.setName("ROLE_USER");
        auth.add(authr);
        authr = new Authority();
        authr.setName("ROLE_HOD");
        auth.add(authr);
        user.setAuthorities(auth);
        userRepository.save(user);
        hOD = hODRepository.save(hOD);
        return hODMapper.toDto(hOD);
    }

    /**
     * Get all the hODS.
     *
     * @return the list of entities.
     */
    @Override
    public List<HODDTO> findAll() {
        log.debug("Request to get all HODS");
        return hODRepository.findAll().stream()
            .map(hODMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one hOD by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<HODDTO> findOne(String id) {
        log.debug("Request to get HOD : {}", id);
        return hODRepository.findById(id)
            .map(hODMapper::toDto);
    }

    /**
     * Delete the hOD by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete HOD : {}", id);
        hODRepository.deleteById(id);
    }
}
