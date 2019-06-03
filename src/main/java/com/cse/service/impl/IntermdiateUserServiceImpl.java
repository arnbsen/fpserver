package com.cse.service.impl;

import com.cse.service.IntermdiateUserService;
import com.cse.domain.IntermdiateUser;
import com.cse.repository.IntermdiateUserRepository;
import com.cse.service.dto.IntermdiateUserDTO;
import com.cse.service.mapper.IntermdiateUserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link IntermdiateUser}.
 */
@Service
public class IntermdiateUserServiceImpl implements IntermdiateUserService {

    private final Logger log = LoggerFactory.getLogger(IntermdiateUserServiceImpl.class);

    private final IntermdiateUserRepository intermdiateUserRepository;

    private final IntermdiateUserMapper intermdiateUserMapper;

    public IntermdiateUserServiceImpl(IntermdiateUserRepository intermdiateUserRepository, IntermdiateUserMapper intermdiateUserMapper) {
        this.intermdiateUserRepository = intermdiateUserRepository;
        this.intermdiateUserMapper = intermdiateUserMapper;
    }

    /**
     * Save a intermdiateUser.
     *
     * @param intermdiateUserDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public IntermdiateUserDTO save(IntermdiateUserDTO intermdiateUserDTO) {
        log.debug("Request to save IntermdiateUser : {}", intermdiateUserDTO);
        IntermdiateUser intermdiateUser = intermdiateUserMapper.toEntity(intermdiateUserDTO);
        intermdiateUser = intermdiateUserRepository.save(intermdiateUser);
        return intermdiateUserMapper.toDto(intermdiateUser);
    }

    /**
     * Get all the intermdiateUsers.
     *
     * @return the list of entities.
     */
    @Override
    public List<IntermdiateUserDTO> findAll() {
        log.debug("Request to get all IntermdiateUsers");
        return intermdiateUserRepository.findAll().stream()
            .map(intermdiateUserMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one intermdiateUser by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<IntermdiateUserDTO> findOne(String id) {
        log.debug("Request to get IntermdiateUser : {}", id);
        return intermdiateUserRepository.findById(id)
            .map(intermdiateUserMapper::toDto);
    }

    /**
     * Delete the intermdiateUser by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete IntermdiateUser : {}", id);
        intermdiateUserRepository.deleteById(id);
    }
}
