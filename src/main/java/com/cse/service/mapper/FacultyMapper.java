package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.FacultyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Faculty} and its DTO {@link FacultyDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FacultyMapper extends EntityMapper<FacultyDTO, Faculty> {


    @Mapping(target = "subjectsTakings", ignore = true)
    Faculty toEntity(FacultyDTO facultyDTO);

    default Faculty fromId(String id) {
        if (id == null) {
            return null;
        }
        Faculty faculty = new Faculty();
        faculty.setId(id);
        return faculty;
    }
}
