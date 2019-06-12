package com.cse.web.rest;

import com.cse.service.AcademicSessionService;
import com.cse.web.rest.errors.BadRequestAlertException;
import com.cse.service.dto.AcademicSessionDTO;

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
 * REST controller for managing {@link com.cse.domain.AcademicSession}.
 */
@RestController
@RequestMapping("/api")
public class AcademicSessionResource {

    private final Logger log = LoggerFactory.getLogger(AcademicSessionResource.class);

    private static final String ENTITY_NAME = "academicSession";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AcademicSessionService academicSessionService;

    public AcademicSessionResource(AcademicSessionService academicSessionService) {
        this.academicSessionService = academicSessionService;
    }

    /**
     * {@code POST  /academic-sessions} : Create a new academicSession.
     *
     * @param academicSessionDTO the academicSessionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new academicSessionDTO, or with status {@code 400 (Bad Request)} if the academicSession has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/academic-sessions")
    public ResponseEntity<AcademicSessionDTO> createAcademicSession(@RequestBody AcademicSessionDTO academicSessionDTO) throws URISyntaxException {
        log.debug("REST request to save AcademicSession : {}", academicSessionDTO);
        if (academicSessionDTO.getId() != null) {
            throw new BadRequestAlertException("A new academicSession cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AcademicSessionDTO result = academicSessionService.save(academicSessionDTO);
        return ResponseEntity.created(new URI("/api/academic-sessions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /academic-sessions} : Updates an existing academicSession.
     *
     * @param academicSessionDTO the academicSessionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated academicSessionDTO,
     * or with status {@code 400 (Bad Request)} if the academicSessionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the academicSessionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/academic-sessions")
    public ResponseEntity<AcademicSessionDTO> updateAcademicSession(@RequestBody AcademicSessionDTO academicSessionDTO) throws URISyntaxException {
        log.debug("REST request to update AcademicSession : {}", academicSessionDTO);
        if (academicSessionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AcademicSessionDTO result = academicSessionService.save(academicSessionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, academicSessionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /academic-sessions} : get all the academicSessions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of academicSessions in body.
     */
    @GetMapping("/academic-sessions")
    public List<AcademicSessionDTO> getAllAcademicSessions() {
        log.debug("REST request to get all AcademicSessions");
        return academicSessionService.findAll();
    }

    /**
     * {@code GET  /academic-sessions/:id} : get the "id" academicSession.
     *
     * @param id the id of the academicSessionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the academicSessionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/academic-sessions/{id}")
    public ResponseEntity<AcademicSessionDTO> getAcademicSession(@PathVariable String id) {
        log.debug("REST request to get AcademicSession : {}", id);
        Optional<AcademicSessionDTO> academicSessionDTO = academicSessionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(academicSessionDTO);
    }

    /**
     * {@code DELETE  /academic-sessions/:id} : delete the "id" academicSession.
     *
     * @param id the id of the academicSessionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/academic-sessions/{id}")
    public ResponseEntity<Void> deleteAcademicSession(@PathVariable String id) {
        log.debug("REST request to delete AcademicSession : {}", id);
        academicSessionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
