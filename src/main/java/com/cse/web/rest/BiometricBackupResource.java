package com.cse.web.rest;

import com.cse.service.BiometricBackupService;
import com.cse.web.rest.errors.BadRequestAlertException;
import com.cse.service.dto.BiometricBackupDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.cse.domain.BiometricBackup}.
 */
@RestController
@RequestMapping("/api")
public class BiometricBackupResource {

    private final Logger log = LoggerFactory.getLogger(BiometricBackupResource.class);

    private static final String ENTITY_NAME = "biometricBackup";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BiometricBackupService biometricBackupService;

    public BiometricBackupResource(BiometricBackupService biometricBackupService) {
        this.biometricBackupService = biometricBackupService;
    }

    /**
     * {@code POST  /biometric-backups} : Create a new biometricBackup.
     *
     * @param biometricBackupDTO the biometricBackupDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new biometricBackupDTO, or with status {@code 400 (Bad Request)} if the biometricBackup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/biometric-backups")
    public ResponseEntity<BiometricBackupDTO> createBiometricBackup(@RequestBody BiometricBackupDTO biometricBackupDTO) throws URISyntaxException {
        log.debug("REST request to save BiometricBackup : {}", biometricBackupDTO);
        if (biometricBackupDTO.getId() != null) {
            throw new BadRequestAlertException("A new biometricBackup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BiometricBackupDTO result = biometricBackupService.save(biometricBackupDTO);
        return ResponseEntity.created(new URI("/api/biometric-backups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /biometric-backups} : Updates an existing biometricBackup.
     *
     * @param biometricBackupDTO the biometricBackupDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated biometricBackupDTO,
     * or with status {@code 400 (Bad Request)} if the biometricBackupDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the biometricBackupDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/biometric-backups")
    public ResponseEntity<BiometricBackupDTO> updateBiometricBackup(@RequestBody BiometricBackupDTO biometricBackupDTO) throws URISyntaxException {
        log.debug("REST request to update BiometricBackup : {}", biometricBackupDTO);
        if (biometricBackupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BiometricBackupDTO result = biometricBackupService.save(biometricBackupDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, biometricBackupDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /biometric-backups} : get all the biometricBackups.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of biometricBackups in body.
     */
    @GetMapping("/biometric-backups")
    public List<BiometricBackupDTO> getAllBiometricBackups() {
        log.debug("REST request to get all BiometricBackups");
        return biometricBackupService.findAll();
    }

    /**
     * {@code GET  /biometric-backups/:id} : get the "id" biometricBackup.
     *
     * @param id the id of the biometricBackupDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the biometricBackupDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/biometric-backups/{id}")
    public ResponseEntity<BiometricBackupDTO> getBiometricBackup(@PathVariable String id) {
        log.debug("REST request to get BiometricBackup : {}", id);
        Optional<BiometricBackupDTO> biometricBackupDTO = biometricBackupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(biometricBackupDTO);
    }

    /**
     * {@code DELETE  /biometric-backups/:id} : delete the "id" biometricBackup.
     *
     * @param id the id of the biometricBackupDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/biometric-backups/{id}")
    public ResponseEntity<Void> deleteBiometricBackup(@PathVariable String id) {
        log.debug("REST request to delete BiometricBackup : {}", id);
        biometricBackupService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
