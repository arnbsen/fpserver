package com.cse.web.rest;

import com.cse.service.DayTimeTableService;
import com.cse.web.rest.errors.BadRequestAlertException;
import com.cse.service.dto.DayTimeTableDTO;

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
 * REST controller for managing {@link com.cse.domain.DayTimeTable}.
 */
@RestController
@RequestMapping("/api")
public class DayTimeTableResource {

    private final Logger log = LoggerFactory.getLogger(DayTimeTableResource.class);

    private static final String ENTITY_NAME = "dayTimeTable";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DayTimeTableService dayTimeTableService;

    public DayTimeTableResource(DayTimeTableService dayTimeTableService) {
        this.dayTimeTableService = dayTimeTableService;
    }

    /**
     * {@code POST  /day-time-tables} : Create a new dayTimeTable.
     *
     * @param dayTimeTableDTO the dayTimeTableDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dayTimeTableDTO, or with status {@code 400 (Bad Request)} if the dayTimeTable has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/day-time-tables")
    public ResponseEntity<DayTimeTableDTO> createDayTimeTable(@Valid @RequestBody DayTimeTableDTO dayTimeTableDTO) throws URISyntaxException {
        log.debug("REST request to save DayTimeTable : {}", dayTimeTableDTO);
        if (dayTimeTableDTO.getId() != null) {
            throw new BadRequestAlertException("A new dayTimeTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DayTimeTableDTO result = dayTimeTableService.save(dayTimeTableDTO);
        return ResponseEntity.created(new URI("/api/day-time-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /day-time-tables} : Updates an existing dayTimeTable.
     *
     * @param dayTimeTableDTO the dayTimeTableDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dayTimeTableDTO,
     * or with status {@code 400 (Bad Request)} if the dayTimeTableDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dayTimeTableDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/day-time-tables")
    public ResponseEntity<DayTimeTableDTO> updateDayTimeTable(@Valid @RequestBody DayTimeTableDTO dayTimeTableDTO) throws URISyntaxException {
        log.debug("REST request to update DayTimeTable : {}", dayTimeTableDTO);
        if (dayTimeTableDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DayTimeTableDTO result = dayTimeTableService.save(dayTimeTableDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dayTimeTableDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /day-time-tables} : get all the dayTimeTables.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dayTimeTables in body.
     */
    @GetMapping("/day-time-tables")
    public List<DayTimeTableDTO> getAllDayTimeTables() {
        log.debug("REST request to get all DayTimeTables");
        return dayTimeTableService.findAll();
    }

    /**
     * {@code GET  /day-time-tables/:id} : get the "id" dayTimeTable.
     *
     * @param id the id of the dayTimeTableDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dayTimeTableDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/day-time-tables/{id}")
    public ResponseEntity<DayTimeTableDTO> getDayTimeTable(@PathVariable String id) {
        log.debug("REST request to get DayTimeTable : {}", id);
        Optional<DayTimeTableDTO> dayTimeTableDTO = dayTimeTableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dayTimeTableDTO);
    }

    /**
     * {@code DELETE  /day-time-tables/:id} : delete the "id" dayTimeTable.
     *
     * @param id the id of the dayTimeTableDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/day-time-tables/{id}")
    public ResponseEntity<Void> deleteDayTimeTable(@PathVariable String id) {
        log.debug("REST request to delete DayTimeTable : {}", id);
        dayTimeTableService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    @PostMapping("/day-time-tables/savebatch")
    List<DayTimeTableDTO> saveAllSubjects(@RequestBody List<DayTimeTableDTO> subjects) {
        return dayTimeTableService.saveBatch(subjects);
    }
}
