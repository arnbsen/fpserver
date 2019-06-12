package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.HODDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link HOD} and its DTO {@link HODDTO}.
 */
@Mapper(componentModel = "spring", uses = {DepartmentMapper.class, UserMapper.class})
public interface HODMapper extends EntityMapper<HODDTO, HOD> {

    @Mapping(source = "department.id", target = "departmentId")
    @Mapping(source = "user.id", target = "userId")
    HODDTO toDto(HOD hOD);

    @Mapping(source = "departmentId", target = "department")
    @Mapping(source = "userId", target = "user")
    HOD toEntity(HODDTO hODDTO);

    default HOD fromId(String id) {
        if (id == null) {
            return null;
        }
        HOD hOD = new HOD();
        hOD.setId(id);
        return hOD;
    }
}
