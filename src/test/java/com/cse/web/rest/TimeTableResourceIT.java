package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.TimeTable;
import com.cse.domain.Department;
import com.cse.repository.TimeTableRepository;
import com.cse.service.TimeTableService;
import com.cse.service.dto.TimeTableDTO;
import com.cse.service.mapper.TimeTableMapper;
import com.cse.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.util.List;

import static com.cse.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link TimeTableResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class TimeTableResourceIT {

    private static final Integer DEFAULT_YEAR = 1;
    private static final Integer UPDATED_YEAR = 2;

    private static final Integer DEFAULT_SEMESTER = 1;
    private static final Integer UPDATED_SEMESTER = 2;

    @Autowired
    private TimeTableRepository timeTableRepository;

    @Autowired
    private TimeTableMapper timeTableMapper;

    @Autowired
    private TimeTableService timeTableService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restTimeTableMockMvc;

    private TimeTable timeTable;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TimeTableResource timeTableResource = new TimeTableResource(timeTableService);
        this.restTimeTableMockMvc = MockMvcBuilders.standaloneSetup(timeTableResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TimeTable createEntity() {
        TimeTable timeTable = new TimeTable()
            .year(DEFAULT_YEAR)
            .semester(DEFAULT_SEMESTER);
        // Add required entity
        Department department;
        if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createEntity();
            department.setId("fixed-id-for-tests");
        } else {
            department = TestUtil.findAll(em, Department.class).get(0);
        }
        timeTable.setDepartment(department);
        return timeTable;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TimeTable createUpdatedEntity() {
        TimeTable timeTable = new TimeTable()
            .year(UPDATED_YEAR)
            .semester(UPDATED_SEMESTER);
        // Add required entity
        Department department;
        if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createUpdatedEntity();
            department.setId("fixed-id-for-tests");
        } else {
            department = TestUtil.findAll(em, Department.class).get(0);
        }
        timeTable.setDepartment(department);
        return timeTable;
    }

    @BeforeEach
    public void initTest() {
        timeTableRepository.deleteAll();
        timeTable = createEntity();
    }

    @Test
    public void createTimeTable() throws Exception {
        int databaseSizeBeforeCreate = timeTableRepository.findAll().size();

        // Create the TimeTable
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(timeTable);
        restTimeTableMockMvc.perform(post("/api/time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeTableDTO)))
            .andExpect(status().isCreated());

        // Validate the TimeTable in the database
        List<TimeTable> timeTableList = timeTableRepository.findAll();
        assertThat(timeTableList).hasSize(databaseSizeBeforeCreate + 1);
        TimeTable testTimeTable = timeTableList.get(timeTableList.size() - 1);
        assertThat(testTimeTable.getYear()).isEqualTo(DEFAULT_YEAR);
        assertThat(testTimeTable.getSemester()).isEqualTo(DEFAULT_SEMESTER);
    }

    @Test
    public void createTimeTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = timeTableRepository.findAll().size();

        // Create the TimeTable with an existing ID
        timeTable.setId("existing_id");
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(timeTable);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTimeTableMockMvc.perform(post("/api/time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TimeTable in the database
        List<TimeTable> timeTableList = timeTableRepository.findAll();
        assertThat(timeTableList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllTimeTables() throws Exception {
        // Initialize the database
        timeTableRepository.save(timeTable);

        // Get all the timeTableList
        restTimeTableMockMvc.perform(get("/api/time-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(timeTable.getId())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR)))
            .andExpect(jsonPath("$.[*].semester").value(hasItem(DEFAULT_SEMESTER)));
    }
    
    @Test
    public void getTimeTable() throws Exception {
        // Initialize the database
        timeTableRepository.save(timeTable);

        // Get the timeTable
        restTimeTableMockMvc.perform(get("/api/time-tables/{id}", timeTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(timeTable.getId()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR))
            .andExpect(jsonPath("$.semester").value(DEFAULT_SEMESTER));
    }

    @Test
    public void getNonExistingTimeTable() throws Exception {
        // Get the timeTable
        restTimeTableMockMvc.perform(get("/api/time-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTimeTable() throws Exception {
        // Initialize the database
        timeTableRepository.save(timeTable);

        int databaseSizeBeforeUpdate = timeTableRepository.findAll().size();

        // Update the timeTable
        TimeTable updatedTimeTable = timeTableRepository.findById(timeTable.getId()).get();
        updatedTimeTable
            .year(UPDATED_YEAR)
            .semester(UPDATED_SEMESTER);
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(updatedTimeTable);

        restTimeTableMockMvc.perform(put("/api/time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeTableDTO)))
            .andExpect(status().isOk());

        // Validate the TimeTable in the database
        List<TimeTable> timeTableList = timeTableRepository.findAll();
        assertThat(timeTableList).hasSize(databaseSizeBeforeUpdate);
        TimeTable testTimeTable = timeTableList.get(timeTableList.size() - 1);
        assertThat(testTimeTable.getYear()).isEqualTo(UPDATED_YEAR);
        assertThat(testTimeTable.getSemester()).isEqualTo(UPDATED_SEMESTER);
    }

    @Test
    public void updateNonExistingTimeTable() throws Exception {
        int databaseSizeBeforeUpdate = timeTableRepository.findAll().size();

        // Create the TimeTable
        TimeTableDTO timeTableDTO = timeTableMapper.toDto(timeTable);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTimeTableMockMvc.perform(put("/api/time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(timeTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TimeTable in the database
        List<TimeTable> timeTableList = timeTableRepository.findAll();
        assertThat(timeTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteTimeTable() throws Exception {
        // Initialize the database
        timeTableRepository.save(timeTable);

        int databaseSizeBeforeDelete = timeTableRepository.findAll().size();

        // Delete the timeTable
        restTimeTableMockMvc.perform(delete("/api/time-tables/{id}", timeTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<TimeTable> timeTableList = timeTableRepository.findAll();
        assertThat(timeTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimeTable.class);
        TimeTable timeTable1 = new TimeTable();
        timeTable1.setId("id1");
        TimeTable timeTable2 = new TimeTable();
        timeTable2.setId(timeTable1.getId());
        assertThat(timeTable1).isEqualTo(timeTable2);
        timeTable2.setId("id2");
        assertThat(timeTable1).isNotEqualTo(timeTable2);
        timeTable1.setId(null);
        assertThat(timeTable1).isNotEqualTo(timeTable2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimeTableDTO.class);
        TimeTableDTO timeTableDTO1 = new TimeTableDTO();
        timeTableDTO1.setId("id1");
        TimeTableDTO timeTableDTO2 = new TimeTableDTO();
        assertThat(timeTableDTO1).isNotEqualTo(timeTableDTO2);
        timeTableDTO2.setId(timeTableDTO1.getId());
        assertThat(timeTableDTO1).isEqualTo(timeTableDTO2);
        timeTableDTO2.setId("id2");
        assertThat(timeTableDTO1).isNotEqualTo(timeTableDTO2);
        timeTableDTO1.setId(null);
        assertThat(timeTableDTO1).isNotEqualTo(timeTableDTO2);
    }
}
