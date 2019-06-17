package com.cse.service.impl;

import com.cse.service.DeviceService;
import com.cse.domain.Authority;
import com.cse.domain.Device;
import com.cse.domain.User;
import com.cse.repository.DeviceRepository;
import com.cse.repository.UserRepository;
import com.cse.service.dto.DeviceDTO;
import com.cse.service.mapper.DeviceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Device}.
 *

 */
@Service
public class DeviceServiceImpl implements DeviceService {

    private final Logger log = LoggerFactory.getLogger(DeviceServiceImpl.class);

    private final DeviceRepository deviceRepository;

    private final DeviceMapper deviceMapper;

    private final UserRepository userRepository;

    public DeviceServiceImpl(DeviceRepository deviceRepository, DeviceMapper deviceMapper, UserRepository userRepository) {
        this.deviceRepository = deviceRepository;
        this.deviceMapper = deviceMapper;
        this.userRepository = userRepository;
    }

    /**
     * Save a device.
     *
     * @param deviceDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DeviceDTO save(DeviceDTO deviceDTO) {
        log.debug("Request to save Device : {}", deviceDTO);
        Device device = deviceMapper.toEntity(deviceDTO);
        User user = userRepository.findById(device.getUser().getId()).get();
        Set<Authority> auth = device.getUser().getAuthorities();
        Authority authr = new Authority();
        authr.setName("ROLE_USER");
        auth.add(authr);
        authr = new Authority();
        authr.setName("ROLE_DEVICE");
        auth.add(authr);
        user.setAuthorities(auth);
        userRepository.save(user);
        user = userRepository.save(user);


        user = userRepository.save(user);
        device = deviceRepository.save(device);
        return deviceMapper.toDto(device);
    }

    /**
     * Get all the devices.
     *
     * @return the list of entities.
     */
    @Override
    public List<DeviceDTO> findAll() {
        log.debug("Request to get all Devices");
        return deviceRepository.findAll().stream()
            .map(deviceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one device by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<DeviceDTO> findOne(String id) {
        log.debug("Request to get Device : {}", id);
        return deviceRepository.findById(id)
            .map(deviceMapper::toDto);
    }

    /**
     * Delete the device by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Device : {}", id);
        deviceRepository.deleteById(id);
    }
}
