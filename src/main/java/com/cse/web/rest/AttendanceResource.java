package com.cse.web.rest;

import com.cse.service.AttendanceService;
import com.cse.web.rest.errors.BadRequestAlertException;
import com.cse.service.dto.AttendanceDTO;

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
 * REST controller for managing {@link com.cse.domain.Attendance}.
 */
@RestController
@RequestMapping("/api")
public class AttendanceResource {

    private final Logger log = LoggerFactory.getLogger(AttendanceResource.class);

    private static final String ENTITY_NAME = "attendance";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AttendanceService attendanceService;

    public AttendanceResource(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    /**
     * {@code POST  /attendances} : Create a new attendance.
     *
     * @param attendanceDTO the attendanceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new attendanceDTO, or with status {@code 400 (Bad Request)} if the attendance has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/attendances")
    public ResponseEntity<AttendanceDTO> createAttendance(@RequestBody AttendanceDTO attendanceDTO) throws URISyntaxException {
        log.debug("REST request to save Attendance : {}", attendanceDTO);
        if (attendanceDTO.getId() != null) {
            throw new BadRequestAlertException("A new attendance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AttendanceDTO result = attendanceService.save(attendanceDTO);
        return ResponseEntity.created(new URI("/api/attendances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /attendances} : Updates an existing attendance.
     *
     * @param attendanceDTO the attendanceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated attendanceDTO,
     * or with status {@code 400 (Bad Request)} if the attendanceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the attendanceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/attendances")
    public ResponseEntity<AttendanceDTO> updateAttendance(@RequestBody AttendanceDTO attendanceDTO) throws URISyntaxException {
        log.debug("REST request to update Attendance : {}", attendanceDTO);
        if (attendanceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AttendanceDTO result = attendanceService.save(attendanceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, attendanceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /attendances} : get all the attendances.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of attendances in body.
     */
    @GetMapping("/attendances")
    public List<AttendanceDTO> getAllAttendances() {
        log.debug("REST request to get all Attendances");
        return attendanceService.findAll();
    }

    /**
     * {@code GET  /attendances/:id} : get the "id" attendance.
     *
     * @param id the id of the attendanceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the attendanceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/attendances/{id}")
    public ResponseEntity<AttendanceDTO> getAttendance(@PathVariable String id) {
        log.debug("REST request to get Attendance : {}", id);
        Optional<AttendanceDTO> attendanceDTO = attendanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(attendanceDTO);
    }

    /**
     * {@code DELETE  /attendances/:id} : delete the "id" attendance.
     *
     * @param id the id of the attendanceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/attendances/{id}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable String id) {
        log.debug("REST request to delete Attendance : {}", id);
        attendanceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id)).build();
    }

    @PostMapping("/attendances/saveatonce")
    public ResponseEntity<List<AttendanceDTO>> saveAtOnce(@RequestBody List<AttendanceDTO> attendances) {
        return ResponseEntity.ok().body(this.attendanceService.saveAll(attendances));
    }
}
