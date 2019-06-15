package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.FacultyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Faculty} and its DTO {@link FacultyDTO}.
 */
@Mapper(componentModel = "spring", uses = {DepartmentMapper.class, SubjectMapper.class, UserMapper.class})
public interface FacultyMapper extends EntityMapper<FacultyDTO, Faculty> {

    @Mapping(source = "department.id", target = "departmentId")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "user.id", target = "userId")
    FacultyDTO toDto(Faculty faculty);

    @Mapping(source = "departmentId", target = "department")
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(source = "userId", target = "user")
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
