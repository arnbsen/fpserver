package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.Student;
import com.cse.domain.Department;
import com.cse.repository.StudentRepository;
import com.cse.service.StudentService;
import com.cse.service.dto.StudentDTO;
import com.cse.service.mapper.StudentMapper;
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
 * Integration tests for the {@Link StudentResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class StudentResourceIT {

    private static final Long DEFAULT_YEAR_JOINED = 1L;
    private static final Long UPDATED_YEAR_JOINED = 2L;

    private static final Integer DEFAULT_CURRENT_YEAR = 1;
    private static final Integer UPDATED_CURRENT_YEAR = 2;

    private static final Integer DEFAULT_CURRENT_SEM = 1;
    private static final Integer UPDATED_CURRENT_SEM = 2;

    private static final Integer DEFAULT_CLASS_ROLL_NUMBER = 1;
    private static final Integer UPDATED_CLASS_ROLL_NUMBER = 2;

    private static final String DEFAULT_CURRENT_SESSION = "AAAAAAAAAA";
    private static final String UPDATED_CURRENT_SESSION = "BBBBBBBBBB";

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private StudentService studentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restStudentMockMvc;

    private Student student;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudentResource studentResource = new StudentResource(studentService);
        this.restStudentMockMvc = MockMvcBuilders.standaloneSetup(studentResource)
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
    public static Student createEntity() {
        Student student = new Student()
            .yearJoined(DEFAULT_YEAR_JOINED)
            .currentYear(DEFAULT_CURRENT_YEAR)
            .currentSem(DEFAULT_CURRENT_SEM)
            .classRollNumber(DEFAULT_CLASS_ROLL_NUMBER)
            .currentSession(DEFAULT_CURRENT_SESSION);
        // Add required entity
        Department department;
        if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createEntity();
            department.setId("fixed-id-for-tests");
        } else {
            department = TestUtil.findAll(em, Department.class).get(0);
        }
        student.setDepartment(department);
        return student;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Student createUpdatedEntity() {
        Student student = new Student()
            .yearJoined(UPDATED_YEAR_JOINED)
            .currentYear(UPDATED_CURRENT_YEAR)
            .currentSem(UPDATED_CURRENT_SEM)
            .classRollNumber(UPDATED_CLASS_ROLL_NUMBER)
            .currentSession(UPDATED_CURRENT_SESSION);
        // Add required entity
        Department department;
        if (TestUtil.findAll(em, Department.class).isEmpty()) {
            department = DepartmentResourceIT.createUpdatedEntity();
            department.setId("fixed-id-for-tests");
        } else {
            department = TestUtil.findAll(em, Department.class).get(0);
        }
        student.setDepartment(department);
        return student;
    }

    @BeforeEach
    public void initTest() {
        studentRepository.deleteAll();
        student = createEntity();
    }

    @Test
    public void createStudent() throws Exception {
        int databaseSizeBeforeCreate = studentRepository.findAll().size();

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(student);
        restStudentMockMvc.perform(post("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isCreated());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeCreate + 1);
        Student testStudent = studentList.get(studentList.size() - 1);
        assertThat(testStudent.getYearJoined()).isEqualTo(DEFAULT_YEAR_JOINED);
        assertThat(testStudent.getCurrentYear()).isEqualTo(DEFAULT_CURRENT_YEAR);
        assertThat(testStudent.getCurrentSem()).isEqualTo(DEFAULT_CURRENT_SEM);
        assertThat(testStudent.getClassRollNumber()).isEqualTo(DEFAULT_CLASS_ROLL_NUMBER);
        assertThat(testStudent.getCurrentSession()).isEqualTo(DEFAULT_CURRENT_SESSION);
    }

    @Test
    public void createStudentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentRepository.findAll().size();

        // Create the Student with an existing ID
        student.setId("existing_id");
        StudentDTO studentDTO = studentMapper.toDto(student);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentMockMvc.perform(post("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllStudents() throws Exception {
        // Initialize the database
        studentRepository.save(student);

        // Get all the studentList
        restStudentMockMvc.perform(get("/api/students?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(student.getId())))
            .andExpect(jsonPath("$.[*].yearJoined").value(hasItem(DEFAULT_YEAR_JOINED.intValue())))
            .andExpect(jsonPath("$.[*].currentYear").value(hasItem(DEFAULT_CURRENT_YEAR)))
            .andExpect(jsonPath("$.[*].currentSem").value(hasItem(DEFAULT_CURRENT_SEM)))
            .andExpect(jsonPath("$.[*].classRollNumber").value(hasItem(DEFAULT_CLASS_ROLL_NUMBER)))
            .andExpect(jsonPath("$.[*].currentSession").value(hasItem(DEFAULT_CURRENT_SESSION.toString())));
    }
    
    @Test
    public void getStudent() throws Exception {
        // Initialize the database
        studentRepository.save(student);

        // Get the student
        restStudentMockMvc.perform(get("/api/students/{id}", student.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(student.getId()))
            .andExpect(jsonPath("$.yearJoined").value(DEFAULT_YEAR_JOINED.intValue()))
            .andExpect(jsonPath("$.currentYear").value(DEFAULT_CURRENT_YEAR))
            .andExpect(jsonPath("$.currentSem").value(DEFAULT_CURRENT_SEM))
            .andExpect(jsonPath("$.classRollNumber").value(DEFAULT_CLASS_ROLL_NUMBER))
            .andExpect(jsonPath("$.currentSession").value(DEFAULT_CURRENT_SESSION.toString()));
    }

    @Test
    public void getNonExistingStudent() throws Exception {
        // Get the student
        restStudentMockMvc.perform(get("/api/students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateStudent() throws Exception {
        // Initialize the database
        studentRepository.save(student);

        int databaseSizeBeforeUpdate = studentRepository.findAll().size();

        // Update the student
        Student updatedStudent = studentRepository.findById(student.getId()).get();
        updatedStudent
            .yearJoined(UPDATED_YEAR_JOINED)
            .currentYear(UPDATED_CURRENT_YEAR)
            .currentSem(UPDATED_CURRENT_SEM)
            .classRollNumber(UPDATED_CLASS_ROLL_NUMBER)
            .currentSession(UPDATED_CURRENT_SESSION);
        StudentDTO studentDTO = studentMapper.toDto(updatedStudent);

        restStudentMockMvc.perform(put("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isOk());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeUpdate);
        Student testStudent = studentList.get(studentList.size() - 1);
        assertThat(testStudent.getYearJoined()).isEqualTo(UPDATED_YEAR_JOINED);
        assertThat(testStudent.getCurrentYear()).isEqualTo(UPDATED_CURRENT_YEAR);
        assertThat(testStudent.getCurrentSem()).isEqualTo(UPDATED_CURRENT_SEM);
        assertThat(testStudent.getClassRollNumber()).isEqualTo(UPDATED_CLASS_ROLL_NUMBER);
        assertThat(testStudent.getCurrentSession()).isEqualTo(UPDATED_CURRENT_SESSION);
    }

    @Test
    public void updateNonExistingStudent() throws Exception {
        int databaseSizeBeforeUpdate = studentRepository.findAll().size();

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(student);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentMockMvc.perform(put("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteStudent() throws Exception {
        // Initialize the database
        studentRepository.save(student);

        int databaseSizeBeforeDelete = studentRepository.findAll().size();

        // Delete the student
        restStudentMockMvc.perform(delete("/api/students/{id}", student.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Student.class);
        Student student1 = new Student();
        student1.setId("id1");
        Student student2 = new Student();
        student2.setId(student1.getId());
        assertThat(student1).isEqualTo(student2);
        student2.setId("id2");
        assertThat(student1).isNotEqualTo(student2);
        student1.setId(null);
        assertThat(student1).isNotEqualTo(student2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentDTO.class);
        StudentDTO studentDTO1 = new StudentDTO();
        studentDTO1.setId("id1");
        StudentDTO studentDTO2 = new StudentDTO();
        assertThat(studentDTO1).isNotEqualTo(studentDTO2);
        studentDTO2.setId(studentDTO1.getId());
        assertThat(studentDTO1).isEqualTo(studentDTO2);
        studentDTO2.setId("id2");
        assertThat(studentDTO1).isNotEqualTo(studentDTO2);
        studentDTO1.setId(null);
        assertThat(studentDTO1).isNotEqualTo(studentDTO2);
    }
}
