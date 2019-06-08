package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.StudentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Student} and its DTO {@link StudentDTO}.
 */
@Mapper(componentModel = "spring", uses = {DepartmentMapper.class, UserMapper.class})
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {

    @Mapping(source = "department.id", target = "departmentId")
    @Mapping(source = "user.id", target = "userId")
    StudentDTO toDto(Student student);

    @Mapping(source = "departmentId", target = "department")
    @Mapping(source = "userId", target = "user")
    Student toEntity(StudentDTO studentDTO);

    default Student fromId(String id) {
        if (id == null) {
            return null;
        }
        Student student = new Student();
        student.setId(id);
        return student;
    }
}
