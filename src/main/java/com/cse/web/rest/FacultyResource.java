package com.cse.web.rest;

import com.cse.domain.Faculty;
import com.cse.service.FacultyService;
import com.cse.web.rest.errors.BadRequestAlertException;
import com.cse.service.dto.FacultyDTO;

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
 * REST controller for managing {@link com.cse.domain.Faculty}.
 */
@RestController
@RequestMapping("/api")
public class FacultyResource {

    private final Logger log = LoggerFactory.getLogger(FacultyResource.class);

    private static final String ENTITY_NAME = "faculty";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FacultyService facultyService;

    public FacultyResource(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    /**
     * {@code POST  /faculties} : Create a new faculty.
     *
     * @param facultyDTO the facultyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new facultyDTO, or with status {@code 400 (Bad Request)} if the faculty has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/faculties/create")
    public ResponseEntity<FacultyDTO> createFaculty(@Valid @RequestBody FacultyDTO facultyDTO) throws URISyntaxException {
        log.debug("REST request to save Faculty : {}", facultyDTO);
        if (facultyDTO.getId() != null) {
            throw new BadRequestAlertException("A new faculty cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FacultyDTO result = facultyService.save(facultyDTO);
        return ResponseEntity.created(new URI("/api/faculties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /faculties} : Updates an existing faculty.
     *
     * @param facultyDTO the facultyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated facultyDTO,
     * or with status {@code 400 (Bad Request)} if the facultyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the facultyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/faculties")
    public ResponseEntity<FacultyDTO> updateFaculty(@Valid @RequestBody FacultyDTO facultyDTO) throws URISyntaxException {
        log.debug("REST request to update Faculty : {}", facultyDTO);
        if (facultyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FacultyDTO result = facultyService.save(facultyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, facultyDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /faculties} : get all the faculties.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of faculties in body.
     */
    @GetMapping("/faculties")
    public List<FacultyDTO> getAllFaculties() {
        log.debug("REST request to get all Faculties");
        return facultyService.findAll();
    }

    /**
     * {@code GET  /faculties/:id} : get the "id" faculty.
     *
     * @param id the id of the facultyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the facultyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/faculties/{id}")
    public ResponseEntity<FacultyDTO> getFaculty(@PathVariable String id) {
        log.debug("REST request to get Faculty : {}", id);
        Optional<FacultyDTO> facultyDTO = facultyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(facultyDTO);
    }

    /**
     * {@code DELETE  /faculties/:id} : delete the "id" faculty.
     *
     * @param id the id of the facultyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/faculties/{id}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable String id) {
        log.debug("REST request to delete Faculty : {}", id);
        facultyService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    @GetMapping("/faculties/byuserid/{id}")
    public ResponseEntity<FacultyDTO> getFacultybyDeviceID(@PathVariable String id) {
        log.debug("REST request to get Faculty : {}", id);
        Optional<FacultyDTO> facultyDTO = facultyService.findByUserID(id);
        return ResponseUtil.wrapOrNotFound(facultyDTO);
    }

    @GetMapping("/faculties/bydeptid/{id}")
    public List<Faculty> getAllFacultyByDept(@PathVariable String id) {
        return facultyService.findByDepartment(id);
    }
}
