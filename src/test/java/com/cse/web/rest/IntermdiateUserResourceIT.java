package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.IntermdiateUser;
import com.cse.repository.IntermdiateUserRepository;
import com.cse.service.IntermdiateUserService;
import com.cse.service.dto.IntermdiateUserDTO;
import com.cse.service.mapper.IntermdiateUserMapper;
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
 * Integration tests for the {@Link IntermdiateUserResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class IntermdiateUserResourceIT {

    private static final String DEFAULT_DEVICE_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DEVICE_USER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_HARDWARE_ID = "AAAAAAAAAA";
    private static final String UPDATED_HARDWARE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_OTHER_PARAMS = "AAAAAAAAAA";
    private static final String UPDATED_OTHER_PARAMS = "BBBBBBBBBB";

    @Autowired
    private IntermdiateUserRepository intermdiateUserRepository;

    @Autowired
    private IntermdiateUserMapper intermdiateUserMapper;

    @Autowired
    private IntermdiateUserService intermdiateUserService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restIntermdiateUserMockMvc;

    private IntermdiateUser intermdiateUser;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IntermdiateUserResource intermdiateUserResource = new IntermdiateUserResource(intermdiateUserService);
        this.restIntermdiateUserMockMvc = MockMvcBuilders.standaloneSetup(intermdiateUserResource)
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
    public static IntermdiateUser createEntity() {
        IntermdiateUser intermdiateUser = new IntermdiateUser()
            .deviceUserName(DEFAULT_DEVICE_USER_NAME)
            .hardwareID(DEFAULT_HARDWARE_ID)
            .otherParams(DEFAULT_OTHER_PARAMS);
        return intermdiateUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IntermdiateUser createUpdatedEntity() {
        IntermdiateUser intermdiateUser = new IntermdiateUser()
            .deviceUserName(UPDATED_DEVICE_USER_NAME)
            .hardwareID(UPDATED_HARDWARE_ID)
            .otherParams(UPDATED_OTHER_PARAMS);
        return intermdiateUser;
    }

    @BeforeEach
    public void initTest() {
        intermdiateUserRepository.deleteAll();
        intermdiateUser = createEntity();
    }

    @Test
    public void createIntermdiateUser() throws Exception {
        int databaseSizeBeforeCreate = intermdiateUserRepository.findAll().size();

        // Create the IntermdiateUser
        IntermdiateUserDTO intermdiateUserDTO = intermdiateUserMapper.toDto(intermdiateUser);
        restIntermdiateUserMockMvc.perform(post("/api/intermdiate-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intermdiateUserDTO)))
            .andExpect(status().isCreated());

        // Validate the IntermdiateUser in the database
        List<IntermdiateUser> intermdiateUserList = intermdiateUserRepository.findAll();
        assertThat(intermdiateUserList).hasSize(databaseSizeBeforeCreate + 1);
        IntermdiateUser testIntermdiateUser = intermdiateUserList.get(intermdiateUserList.size() - 1);
        assertThat(testIntermdiateUser.getDeviceUserName()).isEqualTo(DEFAULT_DEVICE_USER_NAME);
        assertThat(testIntermdiateUser.getHardwareID()).isEqualTo(DEFAULT_HARDWARE_ID);
        assertThat(testIntermdiateUser.getOtherParams()).isEqualTo(DEFAULT_OTHER_PARAMS);
    }

    @Test
    public void createIntermdiateUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = intermdiateUserRepository.findAll().size();

        // Create the IntermdiateUser with an existing ID
        intermdiateUser.setId("existing_id");
        IntermdiateUserDTO intermdiateUserDTO = intermdiateUserMapper.toDto(intermdiateUser);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIntermdiateUserMockMvc.perform(post("/api/intermdiate-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intermdiateUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the IntermdiateUser in the database
        List<IntermdiateUser> intermdiateUserList = intermdiateUserRepository.findAll();
        assertThat(intermdiateUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkDeviceUserNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = intermdiateUserRepository.findAll().size();
        // set the field null
        intermdiateUser.setDeviceUserName(null);

        // Create the IntermdiateUser, which fails.
        IntermdiateUserDTO intermdiateUserDTO = intermdiateUserMapper.toDto(intermdiateUser);

        restIntermdiateUserMockMvc.perform(post("/api/intermdiate-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intermdiateUserDTO)))
            .andExpect(status().isBadRequest());

        List<IntermdiateUser> intermdiateUserList = intermdiateUserRepository.findAll();
        assertThat(intermdiateUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkHardwareIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = intermdiateUserRepository.findAll().size();
        // set the field null
        intermdiateUser.setHardwareID(null);

        // Create the IntermdiateUser, which fails.
        IntermdiateUserDTO intermdiateUserDTO = intermdiateUserMapper.toDto(intermdiateUser);

        restIntermdiateUserMockMvc.perform(post("/api/intermdiate-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intermdiateUserDTO)))
            .andExpect(status().isBadRequest());

        List<IntermdiateUser> intermdiateUserList = intermdiateUserRepository.findAll();
        assertThat(intermdiateUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllIntermdiateUsers() throws Exception {
        // Initialize the database
        intermdiateUserRepository.save(intermdiateUser);

        // Get all the intermdiateUserList
        restIntermdiateUserMockMvc.perform(get("/api/intermdiate-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(intermdiateUser.getId())))
            .andExpect(jsonPath("$.[*].deviceUserName").value(hasItem(DEFAULT_DEVICE_USER_NAME.toString())))
            .andExpect(jsonPath("$.[*].hardwareID").value(hasItem(DEFAULT_HARDWARE_ID.toString())))
            .andExpect(jsonPath("$.[*].otherParams").value(hasItem(DEFAULT_OTHER_PARAMS.toString())));
    }
    
    @Test
    public void getIntermdiateUser() throws Exception {
        // Initialize the database
        intermdiateUserRepository.save(intermdiateUser);

        // Get the intermdiateUser
        restIntermdiateUserMockMvc.perform(get("/api/intermdiate-users/{id}", intermdiateUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(intermdiateUser.getId()))
            .andExpect(jsonPath("$.deviceUserName").value(DEFAULT_DEVICE_USER_NAME.toString()))
            .andExpect(jsonPath("$.hardwareID").value(DEFAULT_HARDWARE_ID.toString()))
            .andExpect(jsonPath("$.otherParams").value(DEFAULT_OTHER_PARAMS.toString()));
    }

    @Test
    public void getNonExistingIntermdiateUser() throws Exception {
        // Get the intermdiateUser
        restIntermdiateUserMockMvc.perform(get("/api/intermdiate-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateIntermdiateUser() throws Exception {
        // Initialize the database
        intermdiateUserRepository.save(intermdiateUser);

        int databaseSizeBeforeUpdate = intermdiateUserRepository.findAll().size();

        // Update the intermdiateUser
        IntermdiateUser updatedIntermdiateUser = intermdiateUserRepository.findById(intermdiateUser.getId()).get();
        updatedIntermdiateUser
            .deviceUserName(UPDATED_DEVICE_USER_NAME)
            .hardwareID(UPDATED_HARDWARE_ID)
            .otherParams(UPDATED_OTHER_PARAMS);
        IntermdiateUserDTO intermdiateUserDTO = intermdiateUserMapper.toDto(updatedIntermdiateUser);

        restIntermdiateUserMockMvc.perform(put("/api/intermdiate-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intermdiateUserDTO)))
            .andExpect(status().isOk());

        // Validate the IntermdiateUser in the database
        List<IntermdiateUser> intermdiateUserList = intermdiateUserRepository.findAll();
        assertThat(intermdiateUserList).hasSize(databaseSizeBeforeUpdate);
        IntermdiateUser testIntermdiateUser = intermdiateUserList.get(intermdiateUserList.size() - 1);
        assertThat(testIntermdiateUser.getDeviceUserName()).isEqualTo(UPDATED_DEVICE_USER_NAME);
        assertThat(testIntermdiateUser.getHardwareID()).isEqualTo(UPDATED_HARDWARE_ID);
        assertThat(testIntermdiateUser.getOtherParams()).isEqualTo(UPDATED_OTHER_PARAMS);
    }

    @Test
    public void updateNonExistingIntermdiateUser() throws Exception {
        int databaseSizeBeforeUpdate = intermdiateUserRepository.findAll().size();

        // Create the IntermdiateUser
        IntermdiateUserDTO intermdiateUserDTO = intermdiateUserMapper.toDto(intermdiateUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIntermdiateUserMockMvc.perform(put("/api/intermdiate-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(intermdiateUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the IntermdiateUser in the database
        List<IntermdiateUser> intermdiateUserList = intermdiateUserRepository.findAll();
        assertThat(intermdiateUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteIntermdiateUser() throws Exception {
        // Initialize the database
        intermdiateUserRepository.save(intermdiateUser);

        int databaseSizeBeforeDelete = intermdiateUserRepository.findAll().size();

        // Delete the intermdiateUser
        restIntermdiateUserMockMvc.perform(delete("/api/intermdiate-users/{id}", intermdiateUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<IntermdiateUser> intermdiateUserList = intermdiateUserRepository.findAll();
        assertThat(intermdiateUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IntermdiateUser.class);
        IntermdiateUser intermdiateUser1 = new IntermdiateUser();
        intermdiateUser1.setId("id1");
        IntermdiateUser intermdiateUser2 = new IntermdiateUser();
        intermdiateUser2.setId(intermdiateUser1.getId());
        assertThat(intermdiateUser1).isEqualTo(intermdiateUser2);
        intermdiateUser2.setId("id2");
        assertThat(intermdiateUser1).isNotEqualTo(intermdiateUser2);
        intermdiateUser1.setId(null);
        assertThat(intermdiateUser1).isNotEqualTo(intermdiateUser2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(IntermdiateUserDTO.class);
        IntermdiateUserDTO intermdiateUserDTO1 = new IntermdiateUserDTO();
        intermdiateUserDTO1.setId("id1");
        IntermdiateUserDTO intermdiateUserDTO2 = new IntermdiateUserDTO();
        assertThat(intermdiateUserDTO1).isNotEqualTo(intermdiateUserDTO2);
        intermdiateUserDTO2.setId(intermdiateUserDTO1.getId());
        assertThat(intermdiateUserDTO1).isEqualTo(intermdiateUserDTO2);
        intermdiateUserDTO2.setId("id2");
        assertThat(intermdiateUserDTO1).isNotEqualTo(intermdiateUserDTO2);
        intermdiateUserDTO1.setId(null);
        assertThat(intermdiateUserDTO1).isNotEqualTo(intermdiateUserDTO2);
    }
}
