package com.cse.service;

import com.cse.service.dto.BiometricBackupDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.cse.domain.BiometricBackup}.
 */
public interface BiometricBackupService {

    /**
     * Save a biometricBackup.
     *
     * @param biometricBackupDTO the entity to save.
     * @return the persisted entity.
     */
    BiometricBackupDTO save(BiometricBackupDTO biometricBackupDTO);

    /**
     * Get all the biometricBackups.
     *
     * @return the list of entities.
     */
    List<BiometricBackupDTO> findAll();


    /**
     * Get the "id" biometricBackup.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BiometricBackupDTO> findOne(String id);

    /**
     * Delete the "id" biometricBackup.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
