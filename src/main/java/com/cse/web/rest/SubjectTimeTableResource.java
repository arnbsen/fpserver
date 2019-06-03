package com.cse.web.rest;

import com.cse.service.SubjectTimeTableService;
import com.cse.web.rest.errors.BadRequestAlertException;
import com.cse.service.dto.SubjectTimeTableDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.cse.domain.SubjectTimeTable}.
 */
@RestController
@RequestMapping("/api")
public class SubjectTimeTableResource {

    private final Logger log = LoggerFactory.getLogger(SubjectTimeTableResource.class);

    private static final String ENTITY_NAME = "subjectTimeTable";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubjectTimeTableService subjectTimeTableService;

    public SubjectTimeTableResource(SubjectTimeTableService subjectTimeTableService) {
        this.subjectTimeTableService = subjectTimeTableService;
    }

    /**
     * {@code POST  /subject-time-tables} : Create a new subjectTimeTable.
     *
     * @param subjectTimeTableDTO the subjectTimeTableDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subjectTimeTableDTO, or with status {@code 400 (Bad Request)} if the subjectTimeTable has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subject-time-tables")
    public ResponseEntity<SubjectTimeTableDTO> createSubjectTimeTable(@Valid @RequestBody SubjectTimeTableDTO subjectTimeTableDTO) throws URISyntaxException {
        log.debug("REST request to save SubjectTimeTable : {}", subjectTimeTableDTO);
        if (subjectTimeTableDTO.getId() != null) {
            throw new BadRequestAlertException("A new subjectTimeTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubjectTimeTableDTO result = subjectTimeTableService.save(subjectTimeTableDTO);
        return ResponseEntity.created(new URI("/api/subject-time-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subject-time-tables} : Updates an existing subjectTimeTable.
     *
     * @param subjectTimeTableDTO the subjectTimeTableDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subjectTimeTableDTO,
     * or with status {@code 400 (Bad Request)} if the subjectTimeTableDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subjectTimeTableDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subject-time-tables")
    public ResponseEntity<SubjectTimeTableDTO> updateSubjectTimeTable(@Valid @RequestBody SubjectTimeTableDTO subjectTimeTableDTO) throws URISyntaxException {
        log.debug("REST request to update SubjectTimeTable : {}", subjectTimeTableDTO);
        if (subjectTimeTableDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubjectTimeTableDTO result = subjectTimeTableService.save(subjectTimeTableDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, subjectTimeTableDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subject-time-tables} : get all the subjectTimeTables.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subjectTimeTables in body.
     */
    @GetMapping("/subject-time-tables")
    public List<SubjectTimeTableDTO> getAllSubjectTimeTables() {
        log.debug("REST request to get all SubjectTimeTables");
        return subjectTimeTableService.findAll();
    }

    /**
     * {@code GET  /subject-time-tables/:id} : get the "id" subjectTimeTable.
     *
     * @param id the id of the subjectTimeTableDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subjectTimeTableDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subject-time-tables/{id}")
    public ResponseEntity<SubjectTimeTableDTO> getSubjectTimeTable(@PathVariable String id) {
        log.debug("REST request to get SubjectTimeTable : {}", id);
        Optional<SubjectTimeTableDTO> subjectTimeTableDTO = subjectTimeTableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subjectTimeTableDTO);
    }

    /**
     * {@code DELETE  /subject-time-tables/:id} : delete the "id" subjectTimeTable.
     *
     * @param id the id of the subjectTimeTableDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subject-time-tables/{id}")
    public ResponseEntity<Void> deleteSubjectTimeTable(@PathVariable String id) {
        log.debug("REST request to delete SubjectTimeTable : {}", id);
        subjectTimeTableService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
