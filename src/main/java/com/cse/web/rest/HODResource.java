package com.cse.web.rest;

import com.cse.service.HODService;
import com.cse.web.rest.errors.BadRequestAlertException;
import com.cse.service.dto.HODDTO;

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
 * REST controller for managing {@link com.cse.domain.HOD}.
 */
@RestController
@RequestMapping("/api")
public class HODResource {

    private final Logger log = LoggerFactory.getLogger(HODResource.class);

    private static final String ENTITY_NAME = "hOD";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HODService hODService;

    public HODResource(HODService hODService) {
        this.hODService = hODService;
    }

    /**
     * {@code POST  /hods} : Create a new hOD.
     *
     * @param hODDTO the hODDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new hODDTO, or with status {@code 400 (Bad Request)} if the hOD has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/hods")
    public ResponseEntity<HODDTO> createHOD(@Valid @RequestBody HODDTO hODDTO) throws URISyntaxException {
        log.debug("REST request to save HOD : {}", hODDTO);
        if (hODDTO.getId() != null) {
            throw new BadRequestAlertException("A new hOD cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HODDTO result = hODService.save(hODDTO);
        return ResponseEntity.created(new URI("/api/hods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/hods/create")
    public ResponseEntity<HODDTO> createHODReg(@Valid @RequestBody HODDTO hODDTO) throws URISyntaxException {
        log.debug("REST request to save HOD : {}", hODDTO);
        if (hODDTO.getId() != null) {
            throw new BadRequestAlertException("A new hOD cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HODDTO result = hODService.save(hODDTO);
        return ResponseEntity
                .created(new URI("/api/hods/" + result.getId())).headers(HeaderUtil
                        .createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * {@code PUT  /hods} : Updates an existing hOD.
     *
     * @param hODDTO the hODDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated hODDTO,
     * or with status {@code 400 (Bad Request)} if the hODDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the hODDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/hods")
    public ResponseEntity<HODDTO> updateHOD(@Valid @RequestBody HODDTO hODDTO) throws URISyntaxException {
        log.debug("REST request to update HOD : {}", hODDTO);
        if (hODDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HODDTO result = hODService.save(hODDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, hODDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /hods} : get all the hODS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of hODS in body.
     */
    @GetMapping("/hods")
    public List<HODDTO> getAllHODS() {
        log.debug("REST request to get all HODS");
        return hODService.findAll();
    }

    /**
     * {@code GET  /hods/:id} : get the "id" hOD.
     *
     * @param id the id of the hODDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the hODDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/hods/{id}")
    public ResponseEntity<HODDTO> getHOD(@PathVariable String id) {
        log.debug("REST request to get HOD : {}", id);
        Optional<HODDTO> hODDTO = hODService.findOne(id);
        return ResponseUtil.wrapOrNotFound(hODDTO);
    }

    /**
     * {@code DELETE  /hods/:id} : delete the "id" hOD.
     *
     * @param id the id of the hODDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/hods/{id}")
    public ResponseEntity<Void> deleteHOD(@PathVariable String id) {
        log.debug("REST request to delete HOD : {}", id);
        hODService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    @GetMapping("/hods/byuserid/{id}")
    public ResponseEntity<HODDTO> getHODbyDeviceID(@PathVariable String id) {
        log.debug("REST request to get Faculty : {}", id);
        Optional<HODDTO> hodDTO = hODService.findByUserID(id);
        return ResponseUtil.wrapOrNotFound(hodDTO);
    }

    @GetMapping("/hods/bydeptid/{id}")
    public ResponseEntity<HODDTO> getAllHODSByDept(@PathVariable String id) {
       Optional<HODDTO> hodDTO = hODService.findByDepartment(id);
       return ResponseUtil.wrapOrNotFound(hodDTO);
    }
}
