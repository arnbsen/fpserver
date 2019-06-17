package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.LocationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Location} and its DTO {@link LocationDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LocationMapper extends EntityMapper<LocationDTO, Location> {



    default Location fromId(String id) {
        if (id == null) {
            return null;
        }
        Location location = new Location();
        location.setId(id);
        return location;
    }
}
