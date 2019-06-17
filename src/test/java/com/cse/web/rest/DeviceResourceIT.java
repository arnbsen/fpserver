package com.cse.web.rest;

import com.cse.DevfpserverApp;
import com.cse.domain.Device;
import com.cse.domain.User;
import com.cse.repository.DeviceRepository;
import com.cse.repository.UserRepository;
import com.cse.service.DeviceService;
import com.cse.service.dto.DeviceDTO;
import com.cse.service.mapper.DeviceMapper;
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

import com.cse.domain.enumeration.DeviceLocation;
/**
 * Integration tests for the {@Link DeviceResource} REST controller.
 */
@SpringBootTest(classes = DevfpserverApp.class)
public class DeviceResourceIT {

    private static final Long DEFAULT_LAST_UPDATED = 1L;
    private static final Long UPDATED_LAST_UPDATED = 2L;

    private static final DeviceLocation DEFAULT_LOCATION = DeviceLocation.LAB;
    private static final DeviceLocation UPDATED_LOCATION = DeviceLocation.CLASS;

    private static final String DEFAULT_LOCATION_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION_NAME = "BBBBBBBBBB";

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private DeviceMapper deviceMapper;

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restDeviceMockMvc;

    @Autowired
    private UserRepository userRepository;

    private static User user;
    private Device device;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeviceResource deviceResource = new DeviceResource(deviceService);
        this.restDeviceMockMvc = MockMvcBuilders.standaloneSetup(deviceResource)
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
    public static Device createEntity() {
        Device device = new Device()
            .lastUpdated(DEFAULT_LAST_UPDATED)
            .location(DEFAULT_LOCATION)
            .locationName(DEFAULT_LOCATION_NAME);
        user = UserResourceIT.createEntity();
        user.setId("fixed-id-for-tests");
        device.setUser(user);
            return device;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Device createUpdatedEntity() {
        Device device = new Device()
            .lastUpdated(UPDATED_LAST_UPDATED)
            .location(UPDATED_LOCATION)
            .locationName(UPDATED_LOCATION_NAME);
        return device;
    }

    @BeforeEach
    public void initTest() {
        deviceRepository.deleteAll();
        device = createEntity();
    }

    @Test
    public void createDevice() throws Exception {
        int databaseSizeBeforeCreate = deviceRepository.findAll().size();
        userRepository.save(user);

        // Create the Device
        DeviceDTO deviceDTO = deviceMapper.toDto(device);
        restDeviceMockMvc.perform(post("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deviceDTO)))
            .andExpect(status().isCreated());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeCreate + 1);
        Device testDevice = deviceList.get(deviceList.size() - 1);
        assertThat(testDevice.getLastUpdated()).isEqualTo(DEFAULT_LAST_UPDATED);
        assertThat(testDevice.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testDevice.getLocationName()).isEqualTo(DEFAULT_LOCATION_NAME);
    }

    @Test
    public void createDeviceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deviceRepository.findAll().size();

        // Create the Device with an existing ID
        device.setId("existing_id");
        DeviceDTO deviceDTO = deviceMapper.toDto(device);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeviceMockMvc.perform(post("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deviceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = deviceRepository.findAll().size();
        // set the field null
        device.setLocation(null);

        // Create the Device, which fails.
        DeviceDTO deviceDTO = deviceMapper.toDto(device);

        restDeviceMockMvc.perform(post("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deviceDTO)))
            .andExpect(status().isBadRequest());

        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllDevices() throws Exception {
        // Initialize the database
        deviceRepository.save(device);

        // Get all the deviceList
        restDeviceMockMvc.perform(get("/api/devices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(device.getId())))
            .andExpect(jsonPath("$.[*].lastUpdated").value(hasItem(DEFAULT_LAST_UPDATED.intValue())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].locationName").value(hasItem(DEFAULT_LOCATION_NAME.toString())));
    }

    @Test
    public void getDevice() throws Exception {
        // Initialize the database
        deviceRepository.save(device);

        // Get the device
        restDeviceMockMvc.perform(get("/api/devices/{id}", device.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(device.getId()))
            .andExpect(jsonPath("$.lastUpdated").value(DEFAULT_LAST_UPDATED.intValue()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.locationName").value(DEFAULT_LOCATION_NAME.toString()));
    }

    @Test
    public void getNonExistingDevice() throws Exception {
        // Get the device
        restDeviceMockMvc.perform(get("/api/devices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateDevice() throws Exception {
        // Initialize the database
        deviceRepository.save(device);
        userRepository.save(user);

        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();

        // Update the device
        Device updatedDevice = deviceRepository.findById(device.getId()).get();
        updatedDevice
            .lastUpdated(UPDATED_LAST_UPDATED)
            .location(UPDATED_LOCATION)
            .locationName(UPDATED_LOCATION_NAME);
        DeviceDTO deviceDTO = deviceMapper.toDto(updatedDevice);

        restDeviceMockMvc.perform(put("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deviceDTO)))
            .andExpect(status().isOk());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
        Device testDevice = deviceList.get(deviceList.size() - 1);
        assertThat(testDevice.getLastUpdated()).isEqualTo(UPDATED_LAST_UPDATED);
        assertThat(testDevice.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testDevice.getLocationName()).isEqualTo(UPDATED_LOCATION_NAME);
    }

    @Test
    public void updateNonExistingDevice() throws Exception {
        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();

        // Create the Device
        DeviceDTO deviceDTO = deviceMapper.toDto(device);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeviceMockMvc.perform(put("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deviceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteDevice() throws Exception {
        // Initialize the database
        deviceRepository.save(device);

        int databaseSizeBeforeDelete = deviceRepository.findAll().size();

        // Delete the device
        restDeviceMockMvc.perform(delete("/api/devices/{id}", device.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Device.class);
        Device device1 = new Device();
        device1.setId("id1");
        Device device2 = new Device();
        device2.setId(device1.getId());
        assertThat(device1).isEqualTo(device2);
        device2.setId("id2");
        assertThat(device1).isNotEqualTo(device2);
        device1.setId(null);
        assertThat(device1).isNotEqualTo(device2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeviceDTO.class);
        DeviceDTO deviceDTO1 = new DeviceDTO();
        deviceDTO1.setId("id1");
        DeviceDTO deviceDTO2 = new DeviceDTO();
        assertThat(deviceDTO1).isNotEqualTo(deviceDTO2);
        deviceDTO2.setId(deviceDTO1.getId());
        assertThat(deviceDTO1).isEqualTo(deviceDTO2);
        deviceDTO2.setId("id2");
        assertThat(deviceDTO1).isNotEqualTo(deviceDTO2);
        deviceDTO1.setId(null);
        assertThat(deviceDTO1).isNotEqualTo(deviceDTO2);
    }
}
