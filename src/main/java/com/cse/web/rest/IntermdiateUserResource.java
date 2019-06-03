package com.cse.web.rest;

import com.cse.service.IntermdiateUserService;
import com.cse.web.rest.errors.BadRequestAlertException;
import com.cse.service.dto.IntermdiateUserDTO;

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
 * REST controller for managing {@link com.cse.domain.IntermdiateUser}.
 */
@RestController
@RequestMapping("/api")
public class IntermdiateUserResource {

    private final Logger log = LoggerFactory.getLogger(IntermdiateUserResource.class);

    private static final String ENTITY_NAME = "intermdiateUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IntermdiateUserService intermdiateUserService;

    public IntermdiateUserResource(IntermdiateUserService intermdiateUserService) {
        this.intermdiateUserService = intermdiateUserService;
    }

    /**
     * {@code POST  /intermdiate-users} : Create a new intermdiateUser.
     *
     * @param intermdiateUserDTO the intermdiateUserDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new intermdiateUserDTO, or with status {@code 400 (Bad Request)} if the intermdiateUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/intermdiate-users")
    public ResponseEntity<IntermdiateUserDTO> createIntermdiateUser(@Valid @RequestBody IntermdiateUserDTO intermdiateUserDTO) throws URISyntaxException {
        log.debug("REST request to save IntermdiateUser : {}", intermdiateUserDTO);
        if (intermdiateUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new intermdiateUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IntermdiateUserDTO result = intermdiateUserService.save(intermdiateUserDTO);
        return ResponseEntity.created(new URI("/api/intermdiate-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /intermdiate-users} : Updates an existing intermdiateUser.
     *
     * @param intermdiateUserDTO the intermdiateUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated intermdiateUserDTO,
     * or with status {@code 400 (Bad Request)} if the intermdiateUserDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the intermdiateUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/intermdiate-users")
    public ResponseEntity<IntermdiateUserDTO> updateIntermdiateUser(@Valid @RequestBody IntermdiateUserDTO intermdiateUserDTO) throws URISyntaxException {
        log.debug("REST request to update IntermdiateUser : {}", intermdiateUserDTO);
        if (intermdiateUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        IntermdiateUserDTO result = intermdiateUserService.save(intermdiateUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, intermdiateUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /intermdiate-users} : get all the intermdiateUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of intermdiateUsers in body.
     */
    @GetMapping("/intermdiate-users")
    public List<IntermdiateUserDTO> getAllIntermdiateUsers() {
        log.debug("REST request to get all IntermdiateUsers");
        return intermdiateUserService.findAll();
    }

    /**
     * {@code GET  /intermdiate-users/:id} : get the "id" intermdiateUser.
     *
     * @param id the id of the intermdiateUserDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the intermdiateUserDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/intermdiate-users/{id}")
    public ResponseEntity<IntermdiateUserDTO> getIntermdiateUser(@PathVariable String id) {
        log.debug("REST request to get IntermdiateUser : {}", id);
        Optional<IntermdiateUserDTO> intermdiateUserDTO = intermdiateUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(intermdiateUserDTO);
    }

    /**
     * {@code DELETE  /intermdiate-users/:id} : delete the "id" intermdiateUser.
     *
     * @param id the id of the intermdiateUserDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/intermdiate-users/{id}")
    public ResponseEntity<Void> deleteIntermdiateUser(@PathVariable String id) {
        log.debug("REST request to delete IntermdiateUser : {}", id);
        intermdiateUserService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
