package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.SubjectTimeTable;
import com.cse.domain.Subject;
import com.cse.repository.SubjectTimeTableRepository;
import com.cse.service.SubjectTimeTableService;
import com.cse.service.dto.SubjectTimeTableDTO;
import com.cse.service.mapper.SubjectTimeTableMapper;
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

import com.cse.domain.enumeration.ClassType;
/**
 * Integration tests for the {@Link SubjectTimeTableResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class SubjectTimeTableResourceIT {

    private static final Long DEFAULT_START_TIME = 1L;
    private static final Long UPDATED_START_TIME = 2L;

    private static final Long DEFAULT_END_TIME = 1L;
    private static final Long UPDATED_END_TIME = 2L;

    private static final ClassType DEFAULT_CLASS_TYPE = ClassType.LAB;
    private static final ClassType UPDATED_CLASS_TYPE = ClassType.REGULAR;

    @Autowired
    private SubjectTimeTableRepository subjectTimeTableRepository;

    @Autowired
    private SubjectTimeTableMapper subjectTimeTableMapper;

    @Autowired
    private SubjectTimeTableService subjectTimeTableService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restSubjectTimeTableMockMvc;

    private SubjectTimeTable subjectTimeTable;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubjectTimeTableResource subjectTimeTableResource = new SubjectTimeTableResource(subjectTimeTableService);
        this.restSubjectTimeTableMockMvc = MockMvcBuilders.standaloneSetup(subjectTimeTableResource)
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
    public static SubjectTimeTable createEntity() {
        SubjectTimeTable subjectTimeTable = new SubjectTimeTable()
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .classType(DEFAULT_CLASS_TYPE);
        // Add required entity
        Subject subject;
        // if (TestUtil.findAll(em, Subject.class).isEmpty()) {
            subject = SubjectResourceIT.createEntity();
            subject.setId("fixed-id-for-tests");
        // } else {
        //     subject = TestUtil.findAll(em, Subject.class).get(0);
        // }
        subjectTimeTable.setSubject(subject);
        return subjectTimeTable;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubjectTimeTable createUpdatedEntity() {
        SubjectTimeTable subjectTimeTable = new SubjectTimeTable()
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .classType(UPDATED_CLASS_TYPE);
        // Add required entity
        Subject subject;
        // if (TestUtil.findAll(em, Subject.class).isEmpty()) {
            subject = SubjectResourceIT.createUpdatedEntity();
            subject.setId("fixed-id-for-tests");
        // } else {
        //     subject = TestUtil.findAll(em, Subject.class).get(0);
        // }
        subjectTimeTable.setSubject(subject);
        return subjectTimeTable;
    }

    @BeforeEach
    public void initTest() {
        subjectTimeTableRepository.deleteAll();
        subjectTimeTable = createEntity();
    }

    @Test
    public void createSubjectTimeTable() throws Exception {
        int databaseSizeBeforeCreate = subjectTimeTableRepository.findAll().size();

        // Create the SubjectTimeTable
        SubjectTimeTableDTO subjectTimeTableDTO = subjectTimeTableMapper.toDto(subjectTimeTable);
        restSubjectTimeTableMockMvc.perform(post("/api/subject-time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectTimeTableDTO)))
            .andExpect(status().isCreated());

        // Validate the SubjectTimeTable in the database
        List<SubjectTimeTable> subjectTimeTableList = subjectTimeTableRepository.findAll();
        assertThat(subjectTimeTableList).hasSize(databaseSizeBeforeCreate + 1);
        SubjectTimeTable testSubjectTimeTable = subjectTimeTableList.get(subjectTimeTableList.size() - 1);
        assertThat(testSubjectTimeTable.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testSubjectTimeTable.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testSubjectTimeTable.getClassType()).isEqualTo(DEFAULT_CLASS_TYPE);
    }

    @Test
    public void createSubjectTimeTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subjectTimeTableRepository.findAll().size();

        // Create the SubjectTimeTable with an existing ID
        subjectTimeTable.setId("existing_id");
        SubjectTimeTableDTO subjectTimeTableDTO = subjectTimeTableMapper.toDto(subjectTimeTable);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubjectTimeTableMockMvc.perform(post("/api/subject-time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectTimeTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubjectTimeTable in the database
        List<SubjectTimeTable> subjectTimeTableList = subjectTimeTableRepository.findAll();
        assertThat(subjectTimeTableList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllSubjectTimeTables() throws Exception {
        // Initialize the database
        subjectTimeTableRepository.save(subjectTimeTable);

        // Get all the subjectTimeTableList
        restSubjectTimeTableMockMvc.perform(get("/api/subject-time-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subjectTimeTable.getId())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.intValue())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.intValue())))
            .andExpect(jsonPath("$.[*].classType").value(hasItem(DEFAULT_CLASS_TYPE.toString())));
    }

    @Test
    public void getSubjectTimeTable() throws Exception {
        // Initialize the database
        subjectTimeTableRepository.save(subjectTimeTable);

        // Get the subjectTimeTable
        restSubjectTimeTableMockMvc.perform(get("/api/subject-time-tables/{id}", subjectTimeTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subjectTimeTable.getId()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.intValue()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.intValue()))
            .andExpect(jsonPath("$.classType").value(DEFAULT_CLASS_TYPE.toString()));
    }

    @Test
    public void getNonExistingSubjectTimeTable() throws Exception {
        // Get the subjectTimeTable
        restSubjectTimeTableMockMvc.perform(get("/api/subject-time-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSubjectTimeTable() throws Exception {
        // Initialize the database
        subjectTimeTableRepository.save(subjectTimeTable);

        int databaseSizeBeforeUpdate = subjectTimeTableRepository.findAll().size();

        // Update the subjectTimeTable
        SubjectTimeTable updatedSubjectTimeTable = subjectTimeTableRepository.findById(subjectTimeTable.getId()).get();
        updatedSubjectTimeTable
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .classType(UPDATED_CLASS_TYPE);
        SubjectTimeTableDTO subjectTimeTableDTO = subjectTimeTableMapper.toDto(updatedSubjectTimeTable);

        restSubjectTimeTableMockMvc.perform(put("/api/subject-time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectTimeTableDTO)))
            .andExpect(status().isOk());

        // Validate the SubjectTimeTable in the database
        List<SubjectTimeTable> subjectTimeTableList = subjectTimeTableRepository.findAll();
        assertThat(subjectTimeTableList).hasSize(databaseSizeBeforeUpdate);
        SubjectTimeTable testSubjectTimeTable = subjectTimeTableList.get(subjectTimeTableList.size() - 1);
        assertThat(testSubjectTimeTable.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testSubjectTimeTable.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testSubjectTimeTable.getClassType()).isEqualTo(UPDATED_CLASS_TYPE);
    }

    @Test
    public void updateNonExistingSubjectTimeTable() throws Exception {
        int databaseSizeBeforeUpdate = subjectTimeTableRepository.findAll().size();

        // Create the SubjectTimeTable
        SubjectTimeTableDTO subjectTimeTableDTO = subjectTimeTableMapper.toDto(subjectTimeTable);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubjectTimeTableMockMvc.perform(put("/api/subject-time-tables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectTimeTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubjectTimeTable in the database
        List<SubjectTimeTable> subjectTimeTableList = subjectTimeTableRepository.findAll();
        assertThat(subjectTimeTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSubjectTimeTable() throws Exception {
        // Initialize the database
        subjectTimeTableRepository.save(subjectTimeTable);

        int databaseSizeBeforeDelete = subjectTimeTableRepository.findAll().size();

        // Delete the subjectTimeTable
        restSubjectTimeTableMockMvc.perform(delete("/api/subject-time-tables/{id}", subjectTimeTable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<SubjectTimeTable> subjectTimeTableList = subjectTimeTableRepository.findAll();
        assertThat(subjectTimeTableList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubjectTimeTable.class);
        SubjectTimeTable subjectTimeTable1 = new SubjectTimeTable();
        subjectTimeTable1.setId("id1");
        SubjectTimeTable subjectTimeTable2 = new SubjectTimeTable();
        subjectTimeTable2.setId(subjectTimeTable1.getId());
        assertThat(subjectTimeTable1).isEqualTo(subjectTimeTable2);
        subjectTimeTable2.setId("id2");
        assertThat(subjectTimeTable1).isNotEqualTo(subjectTimeTable2);
        subjectTimeTable1.setId(null);
        assertThat(subjectTimeTable1).isNotEqualTo(subjectTimeTable2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubjectTimeTableDTO.class);
        SubjectTimeTableDTO subjectTimeTableDTO1 = new SubjectTimeTableDTO();
        subjectTimeTableDTO1.setId("id1");
        SubjectTimeTableDTO subjectTimeTableDTO2 = new SubjectTimeTableDTO();
        assertThat(subjectTimeTableDTO1).isNotEqualTo(subjectTimeTableDTO2);
        subjectTimeTableDTO2.setId(subjectTimeTableDTO1.getId());
        assertThat(subjectTimeTableDTO1).isEqualTo(subjectTimeTableDTO2);
        subjectTimeTableDTO2.setId("id2");
        assertThat(subjectTimeTableDTO1).isNotEqualTo(subjectTimeTableDTO2);
        subjectTimeTableDTO1.setId(null);
        assertThat(subjectTimeTableDTO1).isNotEqualTo(subjectTimeTableDTO2);
    }
}
