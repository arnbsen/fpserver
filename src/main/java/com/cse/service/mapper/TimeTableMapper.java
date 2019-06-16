package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.TimeTableDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TimeTable} and its DTO {@link TimeTableDTO}.
 */
@Mapper(componentModel = "spring", uses = {DepartmentMapper.class, DayTimeTableMapper.class})
public interface TimeTableMapper extends EntityMapper<TimeTableDTO, TimeTable> {

    @Mapping(source = "department.id", target = "departmentId")
    @Mapping(source = "dayTimeTables", target = "dayTimeTables")
    TimeTableDTO toDto(TimeTable timeTable);

    @Mapping(source = "departmentId", target = "department")
    @Mapping(source = "dayTimeTables", target = "dayTimeTables")
    TimeTable toEntity(TimeTableDTO timeTableDTO);

    default TimeTable fromId(String id) {
        if (id == null) {
            return null;
        }
        TimeTable timeTable = new TimeTable();
        timeTable.setId(id);
        return timeTable;
    }
}
