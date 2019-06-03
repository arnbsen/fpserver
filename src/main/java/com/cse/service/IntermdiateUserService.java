package com.cse.service;

import com.cse.service.dto.IntermdiateUserDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.IntermdiateUser}.
 */
public interface IntermdiateUserService {

    /**
     * Save a intermdiateUser.
     *
     * @param intermdiateUserDTO the entity to save.
     * @return the persisted entity.
     */
    IntermdiateUserDTO save(IntermdiateUserDTO intermdiateUserDTO);

    /**
     * Get all the intermdiateUsers.
     *
     * @return the list of entities.
     */
    List<IntermdiateUserDTO> findAll();


    /**
     * Get the "id" intermdiateUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<IntermdiateUserDTO> findOne(String id);

    /**
     * Delete the "id" intermdiateUser.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
