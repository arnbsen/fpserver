package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.BiometricBackup;
import com.cse.repository.BiometricBackupRepository;
import com.cse.service.BiometricBackupService;
import com.cse.service.dto.BiometricBackupDTO;
import com.cse.service.mapper.BiometricBackupMapper;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;


import java.util.List;

import static com.cse.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.cse.domain.enumeration.UserType;
/**
 * Integration tests for the {@Link BiometricBackupResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class BiometricBackupResourceIT {

    private static final UserType DEFAULT_FOR_USER_TYPE = UserType.STUDENT;
    private static final UserType UPDATED_FOR_USER_TYPE = UserType.FACULTY;

    private static final String DEFAULT_IDENTIFIER = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFIER = "BBBBBBBBBB";

    private static final byte[] DEFAULT_JSON_FILE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_JSON_FILE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_JSON_FILE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_JSON_FILE_CONTENT_TYPE = "image/png";

    @Autowired
    private BiometricBackupRepository biometricBackupRepository;

    @Autowired
    private BiometricBackupMapper biometricBackupMapper;

    @Autowired
    private BiometricBackupService biometricBackupService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restBiometricBackupMockMvc;

    private BiometricBackup biometricBackup;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BiometricBackupResource biometricBackupResource = new BiometricBackupResource(biometricBackupService);
        this.restBiometricBackupMockMvc = MockMvcBuilders.standaloneSetup(biometricBackupResource)
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
    public static BiometricBackup createEntity() {
        BiometricBackup biometricBackup = new BiometricBackup()
            .forUserType(DEFAULT_FOR_USER_TYPE)
            .identifier(DEFAULT_IDENTIFIER)
            .jsonFile(DEFAULT_JSON_FILE)
            .jsonFileContentType(DEFAULT_JSON_FILE_CONTENT_TYPE);
        return biometricBackup;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BiometricBackup createUpdatedEntity() {
        BiometricBackup biometricBackup = new BiometricBackup()
            .forUserType(UPDATED_FOR_USER_TYPE)
            .identifier(UPDATED_IDENTIFIER)
            .jsonFile(UPDATED_JSON_FILE)
            .jsonFileContentType(UPDATED_JSON_FILE_CONTENT_TYPE);
        return biometricBackup;
    }

    @BeforeEach
    public void initTest() {
        biometricBackupRepository.deleteAll();
        biometricBackup = createEntity();
    }

    @Test
    public void createBiometricBackup() throws Exception {
        int databaseSizeBeforeCreate = biometricBackupRepository.findAll().size();

        // Create the BiometricBackup
        BiometricBackupDTO biometricBackupDTO = biometricBackupMapper.toDto(biometricBackup);
        restBiometricBackupMockMvc.perform(post("/api/biometric-backups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(biometricBackupDTO)))
            .andExpect(status().isCreated());

        // Validate the BiometricBackup in the database
        List<BiometricBackup> biometricBackupList = biometricBackupRepository.findAll();
        assertThat(biometricBackupList).hasSize(databaseSizeBeforeCreate + 1);
        BiometricBackup testBiometricBackup = biometricBackupList.get(biometricBackupList.size() - 1);
        assertThat(testBiometricBackup.getForUserType()).isEqualTo(DEFAULT_FOR_USER_TYPE);
        assertThat(testBiometricBackup.getIdentifier()).isEqualTo(DEFAULT_IDENTIFIER);
        assertThat(testBiometricBackup.getJsonFile()).isEqualTo(DEFAULT_JSON_FILE);
        assertThat(testBiometricBackup.getJsonFileContentType()).isEqualTo(DEFAULT_JSON_FILE_CONTENT_TYPE);
    }

    @Test
    public void createBiometricBackupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = biometricBackupRepository.findAll().size();

        // Create the BiometricBackup with an existing ID
        biometricBackup.setId("existing_id");
        BiometricBackupDTO biometricBackupDTO = biometricBackupMapper.toDto(biometricBackup);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBiometricBackupMockMvc.perform(post("/api/biometric-backups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(biometricBackupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BiometricBackup in the database
        List<BiometricBackup> biometricBackupList = biometricBackupRepository.findAll();
        assertThat(biometricBackupList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllBiometricBackups() throws Exception {
        // Initialize the database
        biometricBackupRepository.save(biometricBackup);

        // Get all the biometricBackupList
        restBiometricBackupMockMvc.perform(get("/api/biometric-backups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(biometricBackup.getId())))
            .andExpect(jsonPath("$.[*].forUserType").value(hasItem(DEFAULT_FOR_USER_TYPE.toString())))
            .andExpect(jsonPath("$.[*].identifier").value(hasItem(DEFAULT_IDENTIFIER.toString())))
            .andExpect(jsonPath("$.[*].jsonFileContentType").value(hasItem(DEFAULT_JSON_FILE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].jsonFile").value(hasItem(Base64Utils.encodeToString(DEFAULT_JSON_FILE))));
    }
    
    @Test
    public void getBiometricBackup() throws Exception {
        // Initialize the database
        biometricBackupRepository.save(biometricBackup);

        // Get the biometricBackup
        restBiometricBackupMockMvc.perform(get("/api/biometric-backups/{id}", biometricBackup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(biometricBackup.getId()))
            .andExpect(jsonPath("$.forUserType").value(DEFAULT_FOR_USER_TYPE.toString()))
            .andExpect(jsonPath("$.identifier").value(DEFAULT_IDENTIFIER.toString()))
            .andExpect(jsonPath("$.jsonFileContentType").value(DEFAULT_JSON_FILE_CONTENT_TYPE))
            .andExpect(jsonPath("$.jsonFile").value(Base64Utils.encodeToString(DEFAULT_JSON_FILE)));
    }

    @Test
    public void getNonExistingBiometricBackup() throws Exception {
        // Get the biometricBackup
        restBiometricBackupMockMvc.perform(get("/api/biometric-backups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateBiometricBackup() throws Exception {
        // Initialize the database
        biometricBackupRepository.save(biometricBackup);

        int databaseSizeBeforeUpdate = biometricBackupRepository.findAll().size();

        // Update the biometricBackup
        BiometricBackup updatedBiometricBackup = biometricBackupRepository.findById(biometricBackup.getId()).get();
        updatedBiometricBackup
            .forUserType(UPDATED_FOR_USER_TYPE)
            .identifier(UPDATED_IDENTIFIER)
            .jsonFile(UPDATED_JSON_FILE)
            .jsonFileContentType(UPDATED_JSON_FILE_CONTENT_TYPE);
        BiometricBackupDTO biometricBackupDTO = biometricBackupMapper.toDto(updatedBiometricBackup);

        restBiometricBackupMockMvc.perform(put("/api/biometric-backups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(biometricBackupDTO)))
            .andExpect(status().isOk());

        // Validate the BiometricBackup in the database
        List<BiometricBackup> biometricBackupList = biometricBackupRepository.findAll();
        assertThat(biometricBackupList).hasSize(databaseSizeBeforeUpdate);
        BiometricBackup testBiometricBackup = biometricBackupList.get(biometricBackupList.size() - 1);
        assertThat(testBiometricBackup.getForUserType()).isEqualTo(UPDATED_FOR_USER_TYPE);
        assertThat(testBiometricBackup.getIdentifier()).isEqualTo(UPDATED_IDENTIFIER);
        assertThat(testBiometricBackup.getJsonFile()).isEqualTo(UPDATED_JSON_FILE);
        assertThat(testBiometricBackup.getJsonFileContentType()).isEqualTo(UPDATED_JSON_FILE_CONTENT_TYPE);
    }

    @Test
    public void updateNonExistingBiometricBackup() throws Exception {
        int databaseSizeBeforeUpdate = biometricBackupRepository.findAll().size();

        // Create the BiometricBackup
        BiometricBackupDTO biometricBackupDTO = biometricBackupMapper.toDto(biometricBackup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBiometricBackupMockMvc.perform(put("/api/biometric-backups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(biometricBackupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BiometricBackup in the database
        List<BiometricBackup> biometricBackupList = biometricBackupRepository.findAll();
        assertThat(biometricBackupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteBiometricBackup() throws Exception {
        // Initialize the database
        biometricBackupRepository.save(biometricBackup);

        int databaseSizeBeforeDelete = biometricBackupRepository.findAll().size();

        // Delete the biometricBackup
        restBiometricBackupMockMvc.perform(delete("/api/biometric-backups/{id}", biometricBackup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<BiometricBackup> biometricBackupList = biometricBackupRepository.findAll();
        assertThat(biometricBackupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BiometricBackup.class);
        BiometricBackup biometricBackup1 = new BiometricBackup();
        biometricBackup1.setId("id1");
        BiometricBackup biometricBackup2 = new BiometricBackup();
        biometricBackup2.setId(biometricBackup1.getId());
        assertThat(biometricBackup1).isEqualTo(biometricBackup2);
        biometricBackup2.setId("id2");
        assertThat(biometricBackup1).isNotEqualTo(biometricBackup2);
        biometricBackup1.setId(null);
        assertThat(biometricBackup1).isNotEqualTo(biometricBackup2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BiometricBackupDTO.class);
        BiometricBackupDTO biometricBackupDTO1 = new BiometricBackupDTO();
        biometricBackupDTO1.setId("id1");
        BiometricBackupDTO biometricBackupDTO2 = new BiometricBackupDTO();
        assertThat(biometricBackupDTO1).isNotEqualTo(biometricBackupDTO2);
        biometricBackupDTO2.setId(biometricBackupDTO1.getId());
        assertThat(biometricBackupDTO1).isEqualTo(biometricBackupDTO2);
        biometricBackupDTO2.setId("id2");
        assertThat(biometricBackupDTO1).isNotEqualTo(biometricBackupDTO2);
        biometricBackupDTO1.setId(null);
        assertThat(biometricBackupDTO1).isNotEqualTo(biometricBackupDTO2);
    }
}
