package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.DeviceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Device} and its DTO {@link DeviceDTO}.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, UserMapper.class})
public interface DeviceMapper extends EntityMapper<DeviceDTO, Device> {

    @Mapping(source = "devLoc.id", target = "devLocId")
    @Mapping(source = "user.id", target = "userId")
    DeviceDTO toDto(Device device);

    @Mapping(source = "devLocId", target = "devLoc")
    @Mapping(source = "userId", target = "user")
    Device toEntity(DeviceDTO deviceDTO);

    default Device fromId(String id) {
        if (id == null) {
            return null;
        }
        Device device = new Device();
        device.setId(id);
        return device;
    }
}
