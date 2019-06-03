package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.SubjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Subject} and its DTO {@link SubjectDTO}.
 */
@Mapper(componentModel = "spring", uses = {FacultyMapper.class})
public interface SubjectMapper extends EntityMapper<SubjectDTO, Subject> {

    @Mapping(source = "faculty.id", target = "facultyId")
    SubjectDTO toDto(Subject subject);

    @Mapping(source = "facultyId", target = "faculty")
    Subject toEntity(SubjectDTO subjectDTO);

    default Subject fromId(String id) {
        if (id == null) {
            return null;
        }
        Subject subject = new Subject();
        subject.setId(id);
        return subject;
    }
}
