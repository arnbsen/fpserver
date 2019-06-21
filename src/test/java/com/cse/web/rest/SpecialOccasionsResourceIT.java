package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.SpecialOccasions;
import com.cse.repository.SpecialOccasionsRepository;
import com.cse.service.SpecialOccasionsService;
import com.cse.service.dto.SpecialOccasionsDTO;
import com.cse.service.mapper.SpecialOccasionsMapper;
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
/**
 * Integration tests for the {@Link SpecialOccasionsResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class SpecialOccasionsResourceIT {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final DayType DEFAULT_TYPE = DayType.WORKINGALL;
    private static final DayType UPDATED_TYPE = DayType.COLLEGEONLY;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private SpecialOccasionsRepository specialOccasionsRepository;

    @Autowired
    private SpecialOccasionsMapper specialOccasionsMapper;

    @Autowired
    private SpecialOccasionsService specialOccasionsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restSpecialOccasionsMockMvc;

    private SpecialOccasions specialOccasions;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SpecialOccasionsResource specialOccasionsResource = new SpecialOccasionsResource(specialOccasionsService);
        this.restSpecialOccasionsMockMvc = MockMvcBuilders.standaloneSetup(specialOccasionsResource)
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
    public static SpecialOccasions createEntity() {
        SpecialOccasions specialOccasions = new SpecialOccasions()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .type(DEFAULT_TYPE)
            .description(DEFAULT_DESCRIPTION);
        return specialOccasions;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SpecialOccasions createUpdatedEntity() {
        SpecialOccasions specialOccasions = new SpecialOccasions()
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .type(UPDATED_TYPE)
            .description(UPDATED_DESCRIPTION);
        return specialOccasions;
    }

    @BeforeEach
    public void initTest() {
        specialOccasionsRepository.deleteAll();
        specialOccasions = createEntity();
    }

    @Test
    public void createSpecialOccasions() throws Exception {
        int databaseSizeBeforeCreate = specialOccasionsRepository.findAll().size();

        // Create the SpecialOccasions
        SpecialOccasionsDTO specialOccasionsDTO = specialOccasionsMapper.toDto(specialOccasions);
        restSpecialOccasionsMockMvc.perform(post("/api/special-occasions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(specialOccasionsDTO)))
            .andExpect(status().isCreated());

        // Validate the SpecialOccasions in the database
        List<SpecialOccasions> specialOccasionsList = specialOccasionsRepository.findAll();
        assertThat(specialOccasionsList).hasSize(databaseSizeBeforeCreate + 1);
        SpecialOccasions testSpecialOccasions = specialOccasionsList.get(specialOccasionsList.size() - 1);
        assertThat(testSpecialOccasions.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testSpecialOccasions.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testSpecialOccasions.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testSpecialOccasions.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    public void createSpecialOccasionsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = specialOccasionsRepository.findAll().size();

        // Create the SpecialOccasions with an existing ID
        specialOccasions.setId("existing_id");
        SpecialOccasionsDTO specialOccasionsDTO = specialOccasionsMapper.toDto(specialOccasions);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpecialOccasionsMockMvc.perform(post("/api/special-occasions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(specialOccasionsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SpecialOccasions in the database
        List<SpecialOccasions> specialOccasionsList = specialOccasionsRepository.findAll();
        assertThat(specialOccasionsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllSpecialOccasions() throws Exception {
        // Initialize the database
        specialOccasionsRepository.save(specialOccasions);

        // Get all the specialOccasionsList
        restSpecialOccasionsMockMvc.perform(get("/api/special-occasions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(specialOccasions.getId())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    public void getSpecialOccasions() throws Exception {
        // Initialize the database
        specialOccasionsRepository.save(specialOccasions);

        // Get the specialOccasions
        restSpecialOccasionsMockMvc.perform(get("/api/special-occasions/{id}", specialOccasions.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(specialOccasions.getId()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    public void getNonExistingSpecialOccasions() throws Exception {
        // Get the specialOccasions
        restSpecialOccasionsMockMvc.perform(get("/api/special-occasions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSpecialOccasions() throws Exception {
        // Initialize the database
        specialOccasionsRepository.save(specialOccasions);

        int databaseSizeBeforeUpdate = specialOccasionsRepository.findAll().size();

        // Update the specialOccasions
        SpecialOccasions updatedSpecialOccasions = specialOccasionsRepository.findById(specialOccasions.getId()).get();
        updatedSpecialOccasions
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .type(UPDATED_TYPE)
            .description(UPDATED_DESCRIPTION);
        SpecialOccasionsDTO specialOccasionsDTO = specialOccasionsMapper.toDto(updatedSpecialOccasions);

        restSpecialOccasionsMockMvc.perform(put("/api/special-occasions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(specialOccasionsDTO)))
            .andExpect(status().isOk());

        // Validate the SpecialOccasions in the database
        List<SpecialOccasions> specialOccasionsList = specialOccasionsRepository.findAll();
        assertThat(specialOccasionsList).hasSize(databaseSizeBeforeUpdate);
        SpecialOccasions testSpecialOccasions = specialOccasionsList.get(specialOccasionsList.size() - 1);
        assertThat(testSpecialOccasions.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testSpecialOccasions.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testSpecialOccasions.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testSpecialOccasions.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    public void updateNonExistingSpecialOccasions() throws Exception {
        int databaseSizeBeforeUpdate = specialOccasionsRepository.findAll().size();

        // Create the SpecialOccasions
        SpecialOccasionsDTO specialOccasionsDTO = specialOccasionsMapper.toDto(specialOccasions);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSpecialOccasionsMockMvc.perform(put("/api/special-occasions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(specialOccasionsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SpecialOccasions in the database
        List<SpecialOccasions> specialOccasionsList = specialOccasionsRepository.findAll();
        assertThat(specialOccasionsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSpecialOccasions() throws Exception {
        // Initialize the database
        specialOccasionsRepository.save(specialOccasions);

        int databaseSizeBeforeDelete = specialOccasionsRepository.findAll().size();

        // Delete the specialOccasions
        restSpecialOccasionsMockMvc.perform(delete("/api/special-occasions/{id}", specialOccasions.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<SpecialOccasions> specialOccasionsList = specialOccasionsRepository.findAll();
        assertThat(specialOccasionsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SpecialOccasions.class);
        SpecialOccasions specialOccasions1 = new SpecialOccasions();
        specialOccasions1.setId("id1");
        SpecialOccasions specialOccasions2 = new SpecialOccasions();
        specialOccasions2.setId(specialOccasions1.getId());
        assertThat(specialOccasions1).isEqualTo(specialOccasions2);
        specialOccasions2.setId("id2");
        assertThat(specialOccasions1).isNotEqualTo(specialOccasions2);
        specialOccasions1.setId(null);
        assertThat(specialOccasions1).isNotEqualTo(specialOccasions2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SpecialOccasionsDTO.class);
        SpecialOccasionsDTO specialOccasionsDTO1 = new SpecialOccasionsDTO();
        specialOccasionsDTO1.setId("id1");
        SpecialOccasionsDTO specialOccasionsDTO2 = new SpecialOccasionsDTO();
        assertThat(specialOccasionsDTO1).isNotEqualTo(specialOccasionsDTO2);
        specialOccasionsDTO2.setId(specialOccasionsDTO1.getId());
        assertThat(specialOccasionsDTO1).isEqualTo(specialOccasionsDTO2);
        specialOccasionsDTO2.setId("id2");
        assertThat(specialOccasionsDTO1).isNotEqualTo(specialOccasionsDTO2);
        specialOccasionsDTO1.setId(null);
        assertThat(specialOccasionsDTO1).isNotEqualTo(specialOccasionsDTO2);
    }
}
