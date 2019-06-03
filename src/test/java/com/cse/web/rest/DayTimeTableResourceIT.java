package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.DayTimeTable;
import com.cse.repository.DayTimeTableRepository;
import com.cse.service.DayTimeTableService;
import com.cse.service.dto.DayTimeTableDTO;
import com.cse.service.mapper.DayTimeTableMapper;
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

import com.cse.domain.enumeration.DayType;
import com.cse.domain.enumeration.DayOfWeek;
/**
 * Integration tests for the {@Link DayTimeTableResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class DayTimeTableResourceIT {

    private static final DayType DEFAULT_DAY_TYPE = DayType.WORKINGALL;
    private static final DayType UPDATED_DAY_TYPE = DayType.COLLEGEONLY;

    private static final DayOfWeek DEFAULT_DAY_OF_WEEK = DayOfWeek.MONDAY;
    private static final DayOfWeek UPDATED_DAY_OF_WEEK = DayOfWeek.TUESDAY;

    @Autowired
    private DayTimeTableRepository dayTimeTableRepository;

    @Autowired
    private DayTimeTableMapper dayTimeTableMapper;

    @Autowired
    private DayTimeTableService dayTimeTableService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restDayTimeTableMockMvc;

    private DayTimeTable dayTimeTable;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DayTimeTableResource dayTimeTableResource = new DayTimeTableResource(dayTimeTableService);
        this.restDayTimeTableMockMvc = MockMvcBuilders.standaloneSetup(dayTimeTableResource)
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
    public static DayTimeTable createEntity() {
        DayTimeTable dayTimeTable = new DayTimeTable()
            .dayType(DEFAULT_DAY_TYPE)
            .dayOfWeek(DEFAULT_DAY_OF_WEEK);
        return dayTimeTable;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DayTimeTable createUpdatedEntity() {
        DayTimeTable dayTimeTable = new DayTimeTable()
            .dayType(UPDATED_DAY_TYPE)
            .dayOfWeek(UPDATED_DAY_OF_WEEK);
        return dayTimeTable;
    }

    @BeforeEach
    public void initTest() {
        dayTimeTableRepository.deleteAll();
        dayTimeTable = createEntity();
    }

    @Test
    public void createDayTimeTable() throws Exception {
        int databaseSizeBeforeCreate = dayTimeTableRepository.findAll().size();

        // Create the DayTimeTable
        DayTimeTableDTO dayTimeTableDTO = dayTimeTableMapper.toDto(dayTimeTable);
        restDayTimeTableMockMvc.perform(post("/api/day-time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayTimeTableDTO)))
            .andExpect(status().isCreated());

        // Validate the DayTimeTable in the database
        List<DayTimeTable> dayTimeTableList = dayTimeTableRepository.findAll();
        assertThat(dayTimeTableList).hasSize(databaseSizeBeforeCreate + 1);
        DayTimeTable testDayTimeTable = dayTimeTableList.get(dayTimeTableList.size() - 1);
        assertThat(testDayTimeTable.getDayType()).isEqualTo(DEFAULT_DAY_TYPE);
        assertThat(testDayTimeTable.getDayOfWeek()).isEqualTo(DEFAULT_DAY_OF_WEEK);
    }

    @Test
    public void createDayTimeTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dayTimeTableRepository.findAll().size();

        // Create the DayTimeTable with an existing ID
        dayTimeTable.setId("existing_id");
        DayTimeTableDTO dayTimeTableDTO = dayTimeTableMapper.toDto(dayTimeTable);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayTimeTableMockMvc.perform(post("/api/day-time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayTimeTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DayTimeTable in the database
        List<DayTimeTable> dayTimeTableList = dayTimeTableRepository.findAll();
        assertThat(dayTimeTableList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkDayTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = dayTimeTableRepository.findAll().size();
        // set the field null
        dayTimeTable.setDayType(null);

        // Create the DayTimeTable, which fails.
        DayTimeTableDTO dayTimeTableDTO = dayTimeTableMapper.toDto(dayTimeTable);

        restDayTimeTableMockMvc.perform(post("/api/day-time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayTimeTableDTO)))
            .andExpect(status().isBadRequest());

        List<DayTimeTable> dayTimeTableList = dayTimeTableRepository.findAll();
        assertThat(dayTimeTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkDayOfWeekIsRequired() throws Exception {
        int databaseSizeBeforeTest = dayTimeTableRepository.findAll().size();
        // set the field null
        dayTimeTable.setDayOfWeek(null);

        // Create the DayTimeTable, which fails.
        DayTimeTableDTO dayTimeTableDTO = dayTimeTableMapper.toDto(dayTimeTable);

        restDayTimeTableMockMvc.perform(post("/api/day-time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayTimeTableDTO)))
            .andExpect(status().isBadRequest());

        List<DayTimeTable> dayTimeTableList = dayTimeTableRepository.findAll();
        assertThat(dayTimeTableList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllDayTimeTables() throws Exception {
        // Initialize the database
        dayTimeTableRepository.save(dayTimeTable);

        // Get all the dayTimeTableList
        restDayTimeTableMockMvc.perform(get("/api/day-time-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dayTimeTable.getId())))
            .andExpect(jsonPath("$.[*].dayType").value(hasItem(DEFAULT_DAY_TYPE.toString())))
            .andExpect(jsonPath("$.[*].dayOfWeek").value(hasItem(DEFAULT_DAY_OF_WEEK.toString())));
    }
    
    @Test
    public void getDayTimeTable() throws Exception {
        // Initialize the database
        dayTimeTableRepository.save(dayTimeTable);

        // Get the dayTimeTable
        restDayTimeTableMockMvc.perform(get("/api/day-time-tables/{id}", dayTimeTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dayTimeTable.getId()))
            .andExpect(jsonPath("$.dayType").value(DEFAULT_DAY_TYPE.toString()))
            .andExpect(jsonPath("$.dayOfWeek").value(DEFAULT_DAY_OF_WEEK.toString()));
    }

    @Test
    public void getNonExistingDayTimeTable() throws Exception {
        // Get the dayTimeTable
        restDayTimeTableMockMvc.perform(get("/api/day-time-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDayTimeTable() throws Exception {
        // Initialize the database
        dayTimeTableRepository.save(dayTimeTable);

        int databaseSizeBeforeUpdate = dayTimeTableRepository.findAll().size();

        // Update the dayTimeTable
        DayTimeTable updatedDayTimeTable = dayTimeTableRepository.findById(dayTimeTable.getId()).get();
        updatedDayTimeTable
            .dayType(UPDATED_DAY_TYPE)
            .dayOfWeek(UPDATED_DAY_OF_WEEK);
        DayTimeTableDTO dayTimeTableDTO = dayTimeTableMapper.toDto(updatedDayTimeTable);

        restDayTimeTableMockMvc.perform(put("/api/day-time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayTimeTableDTO)))
            .andExpect(status().isOk());

        // Validate the DayTimeTable in the database
        List<DayTimeTable> dayTimeTableList = dayTimeTableRepository.findAll();
        assertThat(dayTimeTableList).hasSize(databaseSizeBeforeUpdate);
        DayTimeTable testDayTimeTable = dayTimeTableList.get(dayTimeTableList.size() - 1);
        assertThat(testDayTimeTable.getDayType()).isEqualTo(UPDATED_DAY_TYPE);
        assertThat(testDayTimeTable.getDayOfWeek()).isEqualTo(UPDATED_DAY_OF_WEEK);
    }

    @Test
    public void updateNonExistingDayTimeTable() throws Exception {
        int databaseSizeBeforeUpdate = dayTimeTableRepository.findAll().size();

        // Create the DayTimeTable
        DayTimeTableDTO dayTimeTableDTO = dayTimeTableMapper.toDto(dayTimeTable);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayTimeTableMockMvc.perform(put("/api/day-time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayTimeTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DayTimeTable in the database
        List<DayTimeTable> dayTimeTableList = dayTimeTableRepository.findAll();
        assertThat(dayTimeTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteDayTimeTable() throws Exception {
        // Initialize the database
        dayTimeTableRepository.save(dayTimeTable);

        int databaseSizeBeforeDelete = dayTimeTableRepository.findAll().size();

        // Delete the dayTimeTable
        restDayTimeTableMockMvc.perform(delete("/api/day-time-tables/{id}", dayTimeTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<DayTimeTable> dayTimeTableList = dayTimeTableRepository.findAll();
        assertThat(dayTimeTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayTimeTable.class);
        DayTimeTable dayTimeTable1 = new DayTimeTable();
        dayTimeTable1.setId("id1");
        DayTimeTable dayTimeTable2 = new DayTimeTable();
        dayTimeTable2.setId(dayTimeTable1.getId());
        assertThat(dayTimeTable1).isEqualTo(dayTimeTable2);
        dayTimeTable2.setId("id2");
        assertThat(dayTimeTable1).isNotEqualTo(dayTimeTable2);
        dayTimeTable1.setId(null);
        assertThat(dayTimeTable1).isNotEqualTo(dayTimeTable2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayTimeTableDTO.class);
        DayTimeTableDTO dayTimeTableDTO1 = new DayTimeTableDTO();
        dayTimeTableDTO1.setId("id1");
        DayTimeTableDTO dayTimeTableDTO2 = new DayTimeTableDTO();
        assertThat(dayTimeTableDTO1).isNotEqualTo(dayTimeTableDTO2);
        dayTimeTableDTO2.setId(dayTimeTableDTO1.getId());
        assertThat(dayTimeTableDTO1).isEqualTo(dayTimeTableDTO2);
        dayTimeTableDTO2.setId("id2");
        assertThat(dayTimeTableDTO1).isNotEqualTo(dayTimeTableDTO2);
        dayTimeTableDTO1.setId(null);
        assertThat(dayTimeTableDTO1).isNotEqualTo(dayTimeTableDTO2);
    }
}
