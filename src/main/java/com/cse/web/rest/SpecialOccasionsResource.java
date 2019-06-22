package com.cse.web.rest;

import com.cse.service.SpecialOccasionsService;
import com.cse.web.rest.errors.BadRequestAlertException;
import com.cse.service.dto.SpecialOccasionsDTO;

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
 * REST controller for managing {@link com.cse.domain.SpecialOccasions}.
 */
@RestController
@RequestMapping("/api")
public class SpecialOccasionsResource {

    private final Logger log = LoggerFactory.getLogger(SpecialOccasionsResource.class);

    private static final String ENTITY_NAME = "specialOccasions";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SpecialOccasionsService specialOccasionsService;

    public SpecialOccasionsResource(SpecialOccasionsService specialOccasionsService) {
        this.specialOccasionsService = specialOccasionsService;
    }

    /**
     * {@code POST  /special-occasions} : Create a new specialOccasions.
     *
     * @param specialOccasionsDTO the specialOccasionsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new specialOccasionsDTO, or with status {@code 400 (Bad Request)} if the specialOccasions has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/special-occasions")
    public ResponseEntity<SpecialOccasionsDTO> createSpecialOccasions(@RequestBody SpecialOccasionsDTO specialOccasionsDTO) throws URISyntaxException {
        log.debug("REST request to save SpecialOccasions : {}", specialOccasionsDTO);
        if (specialOccasionsDTO.getId() != null) {
            throw new BadRequestAlertException("A new specialOccasions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SpecialOccasionsDTO result = specialOccasionsService.save(specialOccasionsDTO);
        return ResponseEntity.created(new URI("/api/special-occasions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /special-occasions} : Updates an existing specialOccasions.
     *
     * @param specialOccasionsDTO the specialOccasionsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated specialOccasionsDTO,
     * or with status {@code 400 (Bad Request)} if the specialOccasionsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the specialOccasionsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/special-occasions")
    public ResponseEntity<SpecialOccasionsDTO> updateSpecialOccasions(@RequestBody SpecialOccasionsDTO specialOccasionsDTO) throws URISyntaxException {
        log.debug("REST request to update SpecialOccasions : {}", specialOccasionsDTO);
        if (specialOccasionsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SpecialOccasionsDTO result = specialOccasionsService.save(specialOccasionsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, specialOccasionsDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /special-occasions} : get all the specialOccasions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of specialOccasions in body.
     */
    @GetMapping("/special-occasions")
    public List<SpecialOccasionsDTO> getAllSpecialOccasions() {
        log.debug("REST request to get all SpecialOccasions");
        return specialOccasionsService.findAll();
    }

    /**
     * {@code GET  /special-occasions/:id} : get the "id" specialOccasions.
     *
     * @param id the id of the specialOccasionsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the specialOccasionsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/special-occasions/{id}")
    public ResponseEntity<SpecialOccasionsDTO> getSpecialOccasions(@PathVariable String id) {
        log.debug("REST request to get SpecialOccasions : {}", id);
        Optional<SpecialOccasionsDTO> specialOccasionsDTO = specialOccasionsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(specialOccasionsDTO);
    }

    /**
     * {@code DELETE  /special-occasions/:id} : delete the "id" specialOccasions.
     *
     * @param id the id of the specialOccasionsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/special-occasions/{id}")
    public ResponseEntity<Void> deleteSpecialOccasions(@PathVariable String id) {
        log.debug("REST request to delete SpecialOccasions : {}", id);
        specialOccasionsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    @GetMapping("/special-occasions/byacademicsession/{id}")
    public List<SpecialOccasionsDTO> byAcademicSession(@PathVariable String id) {
       return specialOccasionsService.findByAcademicSession(id);
    }
}
