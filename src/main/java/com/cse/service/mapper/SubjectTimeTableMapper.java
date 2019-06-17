package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.SubjectTimeTableDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link SubjectTimeTable} and its DTO {@link SubjectTimeTableDTO}.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, SubjectMapper.class, DayTimeTableMapper.class})
public interface SubjectTimeTableMapper extends EntityMapper<SubjectTimeTableDTO, SubjectTimeTable> {

    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "dayTimeTable.id", target = "dayTimeTableId")
    SubjectTimeTableDTO toDto(SubjectTimeTable subjectTimeTable);

    @Mapping(source = "locationId", target = "location")
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(source = "dayTimeTableId", target = "dayTimeTable")
    SubjectTimeTable toEntity(SubjectTimeTableDTO subjectTimeTableDTO);

    default SubjectTimeTable fromId(String id) {
        if (id == null) {
            return null;
        }
        SubjectTimeTable subjectTimeTable = new SubjectTimeTable();
        subjectTimeTable.setId(id);
        return subjectTimeTable;
    }
}
