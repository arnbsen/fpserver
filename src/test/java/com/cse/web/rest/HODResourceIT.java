package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.HOD;
import com.cse.domain.User;
import com.cse.domain.Department;
import com.cse.repository.HODRepository;
import com.cse.repository.UserRepository;
import com.cse.service.HODService;
import com.cse.service.dto.HODDTO;
import com.cse.service.mapper.HODMapper;
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
 * Integration tests for the {@Link HODResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class HODResourceIT {

    private static final String DEFAULT_AUTH_CODE = "AAAAAAAAAA";
    private static final String UPDATED_AUTH_CODE = "BBBBBBBBBB";

    @Autowired
    private HODRepository hODRepository;

    @Autowired
    private HODMapper hODMapper;

    @Autowired
    private HODService hODService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Validator validator;

    private MockMvc restHODMockMvc;

    private HOD hOD;

    private static User user;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HODResource hODResource = new HODResource(hODService);
        this.restHODMockMvc = MockMvcBuilders.standaloneSetup(hODResource)
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
    public static HOD createEntity() {
        HOD hOD = new HOD()
            .authCode(DEFAULT_AUTH_CODE);
        // Add required entity
        Department department;
        department = DepartmentResourceIT.createEntity();
        department.setId("fixed-id-for-tests");
        user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        // if (TestUtil.findAll(em, Department.class).isEmpty()) {
        //     department = DepartmentResourceIT.createEntity();
        //     department.setId("fixed-id-for-tests");
        // } else {
        //     department = TestUtil.findAll(em, Department.class).get(0);
        // }
        hOD.setDepartment(department);
        hOD.setUser(user);
        return hOD;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HOD createUpdatedEntity() {
        HOD hOD = new HOD()
            .authCode(UPDATED_AUTH_CODE);
        // Add required entity
        Department department;
        // if (TestUtil.findAll(em, Department.class).isEmpty()) {
        //     department = DepartmentResourceIT.createUpdatedEntity();
        //     department.setId("fixed-id-for-tests");
        // } else {
        //     department = TestUtil.findAll(em, Department.class).get(0);
        // }
        department = DepartmentResourceIT.createEntity();
        department.setId("fixed-id-for-tests");
        hOD.setDepartment(department);
        return hOD;
    }

    @BeforeEach
    public void initTest() {
        hODRepository.deleteAll();
        hOD = createEntity();
    }

    @Test
    public void createHOD() throws Exception {
        int databaseSizeBeforeCreate = hODRepository.findAll().size();
        userRepository.save(user);
        // Create the HOD
        HODDTO hODDTO = hODMapper.toDto(hOD);
        restHODMockMvc.perform(post("/api/hods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hODDTO)))
            .andExpect(status().isCreated());

        // Validate the HOD in the database
        List<HOD> hODList = hODRepository.findAll();
        assertThat(hODList).hasSize(databaseSizeBeforeCreate + 1);
        HOD testHOD = hODList.get(hODList.size() - 1);
        assertThat(testHOD.getAuthCode()).isEqualTo(DEFAULT_AUTH_CODE);
    }

    @Test
    public void createHODWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hODRepository.findAll().size();

        // Create the HOD with an existing ID
        hOD.setId("existing_id");
        HODDTO hODDTO = hODMapper.toDto(hOD);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHODMockMvc.perform(post("/api/hods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hODDTO)))
            .andExpect(status().isBadRequest());

        // Validate the HOD in the database
        List<HOD> hODList = hODRepository.findAll();
        assertThat(hODList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllHODS() throws Exception {
        // Initialize the database
        hODRepository.save(hOD);

        // Get all the hODList
        restHODMockMvc.perform(get("/api/hods?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hOD.getId())))
            .andExpect(jsonPath("$.[*].authCode").value(hasItem(DEFAULT_AUTH_CODE.toString())));
    }

    @Test
    public void getHOD() throws Exception {
        // Initialize the database
        hODRepository.save(hOD);

        // Get the hOD
        restHODMockMvc.perform(get("/api/hods/{id}", hOD.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hOD.getId()))
            .andExpect(jsonPath("$.authCode").value(DEFAULT_AUTH_CODE.toString()));
    }

    @Test
    public void getNonExistingHOD() throws Exception {
        // Get the hOD
        restHODMockMvc.perform(get("/api/hods/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateHOD() throws Exception {
        // Initialize the database
        hODRepository.save(hOD);
        userRepository.save(user);

        int databaseSizeBeforeUpdate = hODRepository.findAll().size();

        // Update the hOD
        HOD updatedHOD = hODRepository.findById(hOD.getId()).get();
        updatedHOD
            .authCode(UPDATED_AUTH_CODE);
        HODDTO hODDTO = hODMapper.toDto(updatedHOD);
        hODDTO.setUserId(user.getId());
        restHODMockMvc.perform(put("/api/hods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hODDTO)))
            .andExpect(status().isOk());

        // Validate the HOD in the database
        List<HOD> hODList = hODRepository.findAll();
        assertThat(hODList).hasSize(databaseSizeBeforeUpdate);
        HOD testHOD = hODList.get(hODList.size() - 1);
        assertThat(testHOD.getAuthCode()).isEqualTo(UPDATED_AUTH_CODE);
    }

    @Test
    public void updateNonExistingHOD() throws Exception {
        int databaseSizeBeforeUpdate = hODRepository.findAll().size();

        // Create the HOD
        HODDTO hODDTO = hODMapper.toDto(hOD);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHODMockMvc.perform(put("/api/hods")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hODDTO)))
            .andExpect(status().isBadRequest());

        // Validate the HOD in the database
        List<HOD> hODList = hODRepository.findAll();
        assertThat(hODList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteHOD() throws Exception {
        // Initialize the database
        hODRepository.save(hOD);

        int databaseSizeBeforeDelete = hODRepository.findAll().size();

        // Delete the hOD
        restHODMockMvc.perform(delete("/api/hods/{id}", hOD.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<HOD> hODList = hODRepository.findAll();
        assertThat(hODList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HOD.class);
        HOD hOD1 = new HOD();
        hOD1.setId("id1");
        HOD hOD2 = new HOD();
        hOD2.setId(hOD1.getId());
        assertThat(hOD1).isEqualTo(hOD2);
        hOD2.setId("id2");
        assertThat(hOD1).isNotEqualTo(hOD2);
        hOD1.setId(null);
        assertThat(hOD1).isNotEqualTo(hOD2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(HODDTO.class);
        HODDTO hODDTO1 = new HODDTO();
        hODDTO1.setId("id1");
        HODDTO hODDTO2 = new HODDTO();
        assertThat(hODDTO1).isNotEqualTo(hODDTO2);
        hODDTO2.setId(hODDTO1.getId());
        assertThat(hODDTO1).isEqualTo(hODDTO2);
        hODDTO2.setId("id2");
        assertThat(hODDTO1).isNotEqualTo(hODDTO2);
        hODDTO1.setId(null);
        assertThat(hODDTO1).isNotEqualTo(hODDTO2);
    }
}
