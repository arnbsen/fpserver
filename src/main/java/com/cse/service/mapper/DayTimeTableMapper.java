package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.DayTimeTableDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link DayTimeTable} and its DTO {@link DayTimeTableDTO}.
 */
@Mapper(componentModel = "spring", uses = {TimeTableMapper.class, SubjectTimeTableMapper.class})
public interface DayTimeTableMapper extends EntityMapper<DayTimeTableDTO, DayTimeTable> {

    @Mapping(source = "timeTable.id", target = "timeTableId")
    @Mapping(source = "subjects", target = "subjects")
    DayTimeTableDTO toDto(DayTimeTable dayTimeTable);

    @Mapping(source = "timeTableId", target = "timeTable")
    @Mapping(source = "subjects", target = "subjects")
    DayTimeTable toEntity(DayTimeTableDTO dayTimeTableDTO);

    default DayTimeTable fromId(String id) {
        if (id == null) {
            return null;
        }
        DayTimeTable dayTimeTable = new DayTimeTable();
        dayTimeTable.setId(id);
        return dayTimeTable;
    }
}
