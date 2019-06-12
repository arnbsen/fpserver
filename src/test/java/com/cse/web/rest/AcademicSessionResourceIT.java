package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.AcademicSession;
import com.cse.repository.AcademicSessionRepository;
import com.cse.service.AcademicSessionService;
import com.cse.service.dto.AcademicSessionDTO;
import com.cse.service.mapper.AcademicSessionMapper;
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

/**
 * Integration tests for the {@Link AcademicSessionResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class AcademicSessionResourceIT {

    private static final String DEFAULT_ACADEMIC_SESSION = "AAAAAAAAAA";
    private static final String UPDATED_ACADEMIC_SESSION = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private AcademicSessionRepository academicSessionRepository;

    @Autowired
    private AcademicSessionMapper academicSessionMapper;

    @Autowired
    private AcademicSessionService academicSessionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restAcademicSessionMockMvc;

    private AcademicSession academicSession;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AcademicSessionResource academicSessionResource = new AcademicSessionResource(academicSessionService);
        this.restAcademicSessionMockMvc = MockMvcBuilders.standaloneSetup(academicSessionResource)
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
    public static AcademicSession createEntity() {
        AcademicSession academicSession = new AcademicSession()
            .academicSession(DEFAULT_ACADEMIC_SESSION)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return academicSession;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AcademicSession createUpdatedEntity() {
        AcademicSession academicSession = new AcademicSession()
            .academicSession(UPDATED_ACADEMIC_SESSION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return academicSession;
    }

    @BeforeEach
    public void initTest() {
        academicSessionRepository.deleteAll();
        academicSession = createEntity();
    }

    @Test
    public void createAcademicSession() throws Exception {
        int databaseSizeBeforeCreate = academicSessionRepository.findAll().size();

        // Create the AcademicSession
        AcademicSessionDTO academicSessionDTO = academicSessionMapper.toDto(academicSession);
        restAcademicSessionMockMvc.perform(post("/api/academic-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academicSessionDTO)))
            .andExpect(status().isCreated());

        // Validate the AcademicSession in the database
        List<AcademicSession> academicSessionList = academicSessionRepository.findAll();
        assertThat(academicSessionList).hasSize(databaseSizeBeforeCreate + 1);
        AcademicSession testAcademicSession = academicSessionList.get(academicSessionList.size() - 1);
        assertThat(testAcademicSession.getAcademicSession()).isEqualTo(DEFAULT_ACADEMIC_SESSION);
        assertThat(testAcademicSession.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testAcademicSession.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    public void createAcademicSessionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = academicSessionRepository.findAll().size();

        // Create the AcademicSession with an existing ID
        academicSession.setId("existing_id");
        AcademicSessionDTO academicSessionDTO = academicSessionMapper.toDto(academicSession);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcademicSessionMockMvc.perform(post("/api/academic-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academicSessionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AcademicSession in the database
        List<AcademicSession> academicSessionList = academicSessionRepository.findAll();
        assertThat(academicSessionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllAcademicSessions() throws Exception {
        // Initialize the database
        academicSessionRepository.save(academicSession);

        // Get all the academicSessionList
        restAcademicSessionMockMvc.perform(get("/api/academic-sessions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(academicSession.getId())))
            .andExpect(jsonPath("$.[*].academicSession").value(hasItem(DEFAULT_ACADEMIC_SESSION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @Test
    public void getAcademicSession() throws Exception {
        // Initialize the database
        academicSessionRepository.save(academicSession);

        // Get the academicSession
        restAcademicSessionMockMvc.perform(get("/api/academic-sessions/{id}", academicSession.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(academicSession.getId()))
            .andExpect(jsonPath("$.academicSession").value(DEFAULT_ACADEMIC_SESSION.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    public void getNonExistingAcademicSession() throws Exception {
        // Get the academicSession
        restAcademicSessionMockMvc.perform(get("/api/academic-sessions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAcademicSession() throws Exception {
        // Initialize the database
        academicSessionRepository.save(academicSession);

        int databaseSizeBeforeUpdate = academicSessionRepository.findAll().size();

        // Update the academicSession
        AcademicSession updatedAcademicSession = academicSessionRepository.findById(academicSession.getId()).get();
        updatedAcademicSession
            .academicSession(UPDATED_ACADEMIC_SESSION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        AcademicSessionDTO academicSessionDTO = academicSessionMapper.toDto(updatedAcademicSession);

        restAcademicSessionMockMvc.perform(put("/api/academic-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academicSessionDTO)))
            .andExpect(status().isOk());

        // Validate the AcademicSession in the database
        List<AcademicSession> academicSessionList = academicSessionRepository.findAll();
        assertThat(academicSessionList).hasSize(databaseSizeBeforeUpdate);
        AcademicSession testAcademicSession = academicSessionList.get(academicSessionList.size() - 1);
        assertThat(testAcademicSession.getAcademicSession()).isEqualTo(UPDATED_ACADEMIC_SESSION);
        assertThat(testAcademicSession.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testAcademicSession.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    public void updateNonExistingAcademicSession() throws Exception {
        int databaseSizeBeforeUpdate = academicSessionRepository.findAll().size();

        // Create the AcademicSession
        AcademicSessionDTO academicSessionDTO = academicSessionMapper.toDto(academicSession);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcademicSessionMockMvc.perform(put("/api/academic-sessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academicSessionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AcademicSession in the database
        List<AcademicSession> academicSessionList = academicSessionRepository.findAll();
        assertThat(academicSessionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAcademicSession() throws Exception {
        // Initialize the database
        academicSessionRepository.save(academicSession);

        int databaseSizeBeforeDelete = academicSessionRepository.findAll().size();

        // Delete the academicSession
        restAcademicSessionMockMvc.perform(delete("/api/academic-sessions/{id}", academicSession.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<AcademicSession> academicSessionList = academicSessionRepository.findAll();
        assertThat(academicSessionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AcademicSession.class);
        AcademicSession academicSession1 = new AcademicSession();
        academicSession1.setId("id1");
        AcademicSession academicSession2 = new AcademicSession();
        academicSession2.setId(academicSession1.getId());
        assertThat(academicSession1).isEqualTo(academicSession2);
        academicSession2.setId("id2");
        assertThat(academicSession1).isNotEqualTo(academicSession2);
        academicSession1.setId(null);
        assertThat(academicSession1).isNotEqualTo(academicSession2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AcademicSessionDTO.class);
        AcademicSessionDTO academicSessionDTO1 = new AcademicSessionDTO();
        academicSessionDTO1.setId("id1");
        AcademicSessionDTO academicSessionDTO2 = new AcademicSessionDTO();
        assertThat(academicSessionDTO1).isNotEqualTo(academicSessionDTO2);
        academicSessionDTO2.setId(academicSessionDTO1.getId());
        assertThat(academicSessionDTO1).isEqualTo(academicSessionDTO2);
        academicSessionDTO2.setId("id2");
        assertThat(academicSessionDTO1).isNotEqualTo(academicSessionDTO2);
        academicSessionDTO1.setId(null);
        assertThat(academicSessionDTO1).isNotEqualTo(academicSessionDTO2);
    }
}
