package com.cse.web.rest;

import com.cse.service.TimeTableService;
import com.cse.web.rest.errors.BadRequestAlertException;
import com.cse.service.dto.TimeTableDTO;

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
 * REST controller for managing {@link com.cse.domain.TimeTable}.
 */
@RestController
@RequestMapping("/api")
public class TimeTableResource {

    private final Logger log = LoggerFactory.getLogger(TimeTableResource.class);

    private static final String ENTITY_NAME = "timeTable";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TimeTableService timeTableService;

    public TimeTableResource(TimeTableService timeTableService) {
        this.timeTableService = timeTableService;
    }

    /**
     * {@code POST  /time-tables} : Create a new timeTable.
     *
     * @param timeTableDTO the timeTableDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new timeTableDTO, or with status {@code 400 (Bad Request)} if the timeTable has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/time-tables")
    public ResponseEntity<TimeTableDTO> createTimeTable(@Valid @RequestBody TimeTableDTO timeTableDTO) throws URISyntaxException {
        log.debug("REST request to save TimeTable : {}", timeTableDTO);
        if (timeTableDTO.getId() != null) {
            throw new BadRequestAlertException("A new timeTable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TimeTableDTO result = timeTableService.save(timeTableDTO);
        return ResponseEntity.created(new URI("/api/time-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /time-tables} : Updates an existing timeTable.
     *
     * @param timeTableDTO the timeTableDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated timeTableDTO,
     * or with status {@code 400 (Bad Request)} if the timeTableDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the timeTableDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/time-tables")
    public ResponseEntity<TimeTableDTO> updateTimeTable(@Valid @RequestBody TimeTableDTO timeTableDTO) throws URISyntaxException {
        log.debug("REST request to update TimeTable : {}", timeTableDTO);
        if (timeTableDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TimeTableDTO result = timeTableService.save(timeTableDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, timeTableDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /time-tables} : get all the timeTables.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of timeTables in body.
     */
    @GetMapping("/time-tables")
    public List<TimeTableDTO> getAllTimeTables() {
        log.debug("REST request to get all TimeTables");
        return timeTableService.findAll();
    }

    /**
     * {@code GET  /time-tables/:id} : get the "id" timeTable.
     *
     * @param id the id of the timeTableDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the timeTableDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/time-tables/{id}")
    public ResponseEntity<TimeTableDTO> getTimeTable(@PathVariable String id) {
        log.debug("REST request to get TimeTable : {}", id);
        Optional<TimeTableDTO> timeTableDTO = timeTableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(timeTableDTO);
    }

    /**
     * {@code DELETE  /time-tables/:id} : delete the "id" timeTable.
     *
     * @param id the id of the timeTableDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/time-tables/{id}")
    public ResponseEntity<Void> deleteTimeTable(@PathVariable String id) {
        log.debug("REST request to delete TimeTable : {}", id);
        timeTableService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }
}
