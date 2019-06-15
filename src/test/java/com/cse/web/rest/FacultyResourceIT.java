package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.Faculty;
import com.cse.domain.User;
import com.cse.domain.Department;
import com.cse.repository.FacultyRepository;
import com.cse.repository.UserRepository;
import com.cse.service.FacultyService;
import com.cse.service.dto.FacultyDTO;
import com.cse.service.mapper.FacultyMapper;
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
 * Integration tests for the {@Link FacultyResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class FacultyResourceIT {

    private static final String DEFAULT_FACULTY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_FACULTY_CODE = "BBBBBBBBBB";

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private FacultyMapper facultyMapper;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restFacultyMockMvc;

    private Faculty faculty;

    @Autowired
    private UserRepository userRepository;

    private static User user;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FacultyResource facultyResource = new FacultyResource(facultyService);
        this.restFacultyMockMvc = MockMvcBuilders.standaloneSetup(facultyResource)
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
    public static Faculty createEntity() {
        Faculty faculty = new Faculty()
            .facultyCode(DEFAULT_FACULTY_CODE);
        // Add required entity
        user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        Department department;
        // if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createEntity();
            department.setId("fixed-id-for-tests");
        // } else {
        //     department = TestUtil.findAll(em, Department.class).get(0);
        // }
        faculty.setDepartment(department);
        return faculty;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Faculty createUpdatedEntity() {
        Faculty faculty = new Faculty()
            .facultyCode(UPDATED_FACULTY_CODE);
        // Add required entity
        Department department;
        // if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createUpdatedEntity();
            department.setId("fixed-id-for-tests");
        // } else {
        //     department = TestUtil.findAll(em, Department.class).get(0);
        // }
        faculty.setDepartment(department);
        return faculty;
    }

    @BeforeEach
    public void initTest() {
        facultyRepository.deleteAll();
        faculty = createEntity();
    }

    @Test
    public void createFaculty() throws Exception {
        int databaseSizeBeforeCreate = facultyRepository.findAll().size();

        // Create the Faculty
        FacultyDTO facultyDTO = facultyMapper.toDto(faculty);
        restFacultyMockMvc.perform(post("/api/faculties/create")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facultyDTO)))
            .andExpect(status().isCreated());

        // Validate the Faculty in the database
        List<Faculty> facultyList = facultyRepository.findAll();
        assertThat(facultyList).hasSize(databaseSizeBeforeCreate + 1);
        Faculty testFaculty = facultyList.get(facultyList.size() - 1);
        assertThat(testFaculty.getFacultyCode()).isEqualTo(DEFAULT_FACULTY_CODE);
    }

    @Test
    public void createFacultyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facultyRepository.findAll().size();

        // Create the Faculty with an existing ID
        faculty.setId("existing_id");
        FacultyDTO facultyDTO = facultyMapper.toDto(faculty);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacultyMockMvc.perform(post("/api/faculties/create")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facultyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Faculty in the database
        List<Faculty> facultyList = facultyRepository.findAll();
        assertThat(facultyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllFaculties() throws Exception {
        // Initialize the database
        facultyRepository.save(faculty);

        // Get all the facultyList
        restFacultyMockMvc.perform(get("/api/faculties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(faculty.getId())))
            .andExpect(jsonPath("$.[*].facultyCode").value(hasItem(DEFAULT_FACULTY_CODE.toString())));
    }

    @Test
    public void getFaculty() throws Exception {
        // Initialize the database
        facultyRepository.save(faculty);

        // Get the faculty
        restFacultyMockMvc.perform(get("/api/faculties/{id}", faculty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(faculty.getId()))
            .andExpect(jsonPath("$.facultyCode").value(DEFAULT_FACULTY_CODE.toString()));
    }

    @Test
    public void getNonExistingFaculty() throws Exception {
        // Get the faculty
        restFacultyMockMvc.perform(get("/api/faculties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateFaculty() throws Exception {
        // Initialize the database
        facultyRepository.save(faculty);
        userRepository.save(user);
        int databaseSizeBeforeUpdate = facultyRepository.findAll().size();

        // Update the faculty
        Faculty updatedFaculty = facultyRepository.findById(faculty.getId()).get();
        updatedFaculty
            .facultyCode(UPDATED_FACULTY_CODE);
        FacultyDTO facultyDTO = facultyMapper.toDto(updatedFaculty);
        facultyDTO.setUserId(user.getId());
        restFacultyMockMvc.perform(put("/api/faculties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facultyDTO)))
            .andExpect(status().isOk());

        // Validate the Faculty in the database
        List<Faculty> facultyList = facultyRepository.findAll();
        assertThat(facultyList).hasSize(databaseSizeBeforeUpdate);
        Faculty testFaculty = facultyList.get(facultyList.size() - 1);
        assertThat(testFaculty.getFacultyCode()).isEqualTo(UPDATED_FACULTY_CODE);
    }

    @Test
    public void updateNonExistingFaculty() throws Exception {
        int databaseSizeBeforeUpdate = facultyRepository.findAll().size();

        // Create the Faculty
        FacultyDTO facultyDTO = facultyMapper.toDto(faculty);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacultyMockMvc.perform(put("/api/faculties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facultyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Faculty in the database
        List<Faculty> facultyList = facultyRepository.findAll();
        assertThat(facultyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteFaculty() throws Exception {
        // Initialize the database
        facultyRepository.save(faculty);

        int databaseSizeBeforeDelete = facultyRepository.findAll().size();

        // Delete the faculty
        restFacultyMockMvc.perform(delete("/api/faculties/{id}", faculty.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Faculty> facultyList = facultyRepository.findAll();
        assertThat(facultyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Faculty.class);
        Faculty faculty1 = new Faculty();
        faculty1.setId("id1");
        Faculty faculty2 = new Faculty();
        faculty2.setId(faculty1.getId());
        assertThat(faculty1).isEqualTo(faculty2);
        faculty2.setId("id2");
        assertThat(faculty1).isNotEqualTo(faculty2);
        faculty1.setId(null);
        assertThat(faculty1).isNotEqualTo(faculty2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FacultyDTO.class);
        FacultyDTO facultyDTO1 = new FacultyDTO();
        facultyDTO1.setId("id1");
        FacultyDTO facultyDTO2 = new FacultyDTO();
        assertThat(facultyDTO1).isNotEqualTo(facultyDTO2);
        facultyDTO2.setId(facultyDTO1.getId());
        assertThat(facultyDTO1).isEqualTo(facultyDTO2);
        facultyDTO2.setId("id2");
        assertThat(facultyDTO1).isNotEqualTo(facultyDTO2);
        facultyDTO1.setId(null);
        assertThat(facultyDTO1).isNotEqualTo(facultyDTO2);
    }
}
