package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.Day;
import com.cse.repository.DayRepository;
import com.cse.service.DayService;
import com.cse.service.dto.DayDTO;
import com.cse.service.mapper.DayMapper;
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


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.cse.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.cse.domain.enumeration.DayType;
import com.cse.domain.enumeration.DayOfWeek;
/**
 * Integration tests for the {@Link DayResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class DayResourceIT {

    private static final DayType DEFAULT_TYPE = DayType.WORKINGALL;
    private static final DayType UPDATED_TYPE = DayType.COLLEGEONLY;

    private static final DayOfWeek DEFAULT_DAY_OF_THE_WEEK = DayOfWeek.MONDAY;
    private static final DayOfWeek UPDATED_DAY_OF_THE_WEEK = DayOfWeek.TUESDAY;

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private DayRepository dayRepository;

    @Autowired
    private DayMapper dayMapper;

    @Autowired
    private DayService dayService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restDayMockMvc;

    private Day day;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DayResource dayResource = new DayResource(dayService);
        this.restDayMockMvc = MockMvcBuilders.standaloneSetup(dayResource)
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
    public static Day createEntity() {
        Day day = new Day()
            .type(DEFAULT_TYPE)
            .dayOfTheWeek(DEFAULT_DAY_OF_THE_WEEK)
            .date(DEFAULT_DATE);
        return day;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Day createUpdatedEntity() {
        Day day = new Day()
            .type(UPDATED_TYPE)
            .dayOfTheWeek(UPDATED_DAY_OF_THE_WEEK)
            .date(UPDATED_DATE);
        return day;
    }

    @BeforeEach
    public void initTest() {
        dayRepository.deleteAll();
        day = createEntity();
    }

    @Test
    public void createDay() throws Exception {
        int databaseSizeBeforeCreate = dayRepository.findAll().size();

        // Create the Day
        DayDTO dayDTO = dayMapper.toDto(day);
        restDayMockMvc.perform(post("/api/days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayDTO)))
            .andExpect(status().isCreated());

        // Validate the Day in the database
        List<Day> dayList = dayRepository.findAll();
        assertThat(dayList).hasSize(databaseSizeBeforeCreate + 1);
        Day testDay = dayList.get(dayList.size() - 1);
        assertThat(testDay.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testDay.getDayOfTheWeek()).isEqualTo(DEFAULT_DAY_OF_THE_WEEK);
        assertThat(testDay.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    public void createDayWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dayRepository.findAll().size();

        // Create the Day with an existing ID
        day.setId("existing_id");
        DayDTO dayDTO = dayMapper.toDto(day);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDayMockMvc.perform(post("/api/days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Day in the database
        List<Day> dayList = dayRepository.findAll();
        assertThat(dayList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllDays() throws Exception {
        // Initialize the database
        dayRepository.save(day);

        // Get all the dayList
        restDayMockMvc.perform(get("/api/days?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(day.getId())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].dayOfTheWeek").value(hasItem(DEFAULT_DAY_OF_THE_WEEK.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    public void getDay() throws Exception {
        // Initialize the database
        dayRepository.save(day);

        // Get the day
        restDayMockMvc.perform(get("/api/days/{id}", day.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(day.getId()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.dayOfTheWeek").value(DEFAULT_DAY_OF_THE_WEEK.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    public void getNonExistingDay() throws Exception {
        // Get the day
        restDayMockMvc.perform(get("/api/days/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDay() throws Exception {
        // Initialize the database
        dayRepository.save(day);

        int databaseSizeBeforeUpdate = dayRepository.findAll().size();

        // Update the day
        Day updatedDay = dayRepository.findById(day.getId()).get();
        updatedDay
            .type(UPDATED_TYPE)
            .dayOfTheWeek(UPDATED_DAY_OF_THE_WEEK)
            .date(UPDATED_DATE);
        DayDTO dayDTO = dayMapper.toDto(updatedDay);

        restDayMockMvc.perform(put("/api/days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayDTO)))
            .andExpect(status().isOk());

        // Validate the Day in the database
        List<Day> dayList = dayRepository.findAll();
        assertThat(dayList).hasSize(databaseSizeBeforeUpdate);
        Day testDay = dayList.get(dayList.size() - 1);
        assertThat(testDay.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testDay.getDayOfTheWeek()).isEqualTo(UPDATED_DAY_OF_THE_WEEK);
        assertThat(testDay.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    public void updateNonExistingDay() throws Exception {
        int databaseSizeBeforeUpdate = dayRepository.findAll().size();

        // Create the Day
        DayDTO dayDTO = dayMapper.toDto(day);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDayMockMvc.perform(put("/api/days")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dayDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Day in the database
        List<Day> dayList = dayRepository.findAll();
        assertThat(dayList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteDay() throws Exception {
        // Initialize the database
        dayRepository.save(day);

        int databaseSizeBeforeDelete = dayRepository.findAll().size();

        // Delete the day
        restDayMockMvc.perform(delete("/api/days/{id}", day.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Day> dayList = dayRepository.findAll();
        assertThat(dayList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Day.class);
        Day day1 = new Day();
        day1.setId("id1");
        Day day2 = new Day();
        day2.setId(day1.getId());
        assertThat(day1).isEqualTo(day2);
        day2.setId("id2");
        assertThat(day1).isNotEqualTo(day2);
        day1.setId(null);
        assertThat(day1).isNotEqualTo(day2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DayDTO.class);
        DayDTO dayDTO1 = new DayDTO();
        dayDTO1.setId("id1");
        DayDTO dayDTO2 = new DayDTO();
        assertThat(dayDTO1).isNotEqualTo(dayDTO2);
        dayDTO2.setId(dayDTO1.getId());
        assertThat(dayDTO1).isEqualTo(dayDTO2);
        dayDTO2.setId("id2");
        assertThat(dayDTO1).isNotEqualTo(dayDTO2);
        dayDTO1.setId(null);
        assertThat(dayDTO1).isNotEqualTo(dayDTO2);
    }
}
