package com.cse.service.impl;

import com.cse.service.BiometricBackupService;
import com.cse.domain.BiometricBackup;
import com.cse.repository.BiometricBackupRepository;
import com.cse.service.dto.BiometricBackupDTO;
import com.cse.service.mapper.BiometricBackupMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link BiometricBackup}.
 */
@Service
public class BiometricBackupServiceImpl implements BiometricBackupService {

    private final Logger log = LoggerFactory.getLogger(BiometricBackupServiceImpl.class);

    private final BiometricBackupRepository biometricBackupRepository;

    private final BiometricBackupMapper biometricBackupMapper;

    public BiometricBackupServiceImpl(BiometricBackupRepository biometricBackupRepository, BiometricBackupMapper biometricBackupMapper) {
        this.biometricBackupRepository = biometricBackupRepository;
        this.biometricBackupMapper = biometricBackupMapper;
    }

    /**
     * Save a biometricBackup.
     *
     * @param biometricBackupDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BiometricBackupDTO save(BiometricBackupDTO biometricBackupDTO) {
        log.debug("Request to save BiometricBackup : {}", biometricBackupDTO);
        BiometricBackup biometricBackup = biometricBackupMapper.toEntity(biometricBackupDTO);
        biometricBackup = biometricBackupRepository.save(biometricBackup);
        return biometricBackupMapper.toDto(biometricBackup);
    }

    /**
     * Get all the biometricBackups.
     *
     * @return the list of entities.
     */
    @Override
    public List<BiometricBackupDTO> findAll() {
        log.debug("Request to get all BiometricBackups");
        return biometricBackupRepository.findAll().stream()
            .map(biometricBackupMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one biometricBackup by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<BiometricBackupDTO> findOne(String id) {
        log.debug("Request to get BiometricBackup : {}", id);
        return biometricBackupRepository.findById(id)
            .map(biometricBackupMapper::toDto);
    }

    /**
     * Delete the biometricBackup by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete BiometricBackup : {}", id);
        biometricBackupRepository.deleteById(id);
    }
}
