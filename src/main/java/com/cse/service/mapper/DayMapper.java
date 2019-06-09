package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.DayDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Day} and its DTO {@link DayDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DayMapper extends EntityMapper<DayDTO, Day> {



    default Day fromId(String id) {
        if (id == null) {
            return null;
        }
        Day day = new Day();
        day.setId(id);
        return day;
    }
}
