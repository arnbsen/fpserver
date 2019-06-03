package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.HODDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link HOD} and its DTO {@link HODDTO}.
 */
@Mapper(componentModel = "spring", uses = {DepartmentMapper.class})
public interface HODMapper extends EntityMapper<HODDTO, HOD> {

    @Mapping(source = "department.id", target = "departmentId")
    HODDTO toDto(HOD hOD);

    @Mapping(source = "departmentId", target = "department")
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
