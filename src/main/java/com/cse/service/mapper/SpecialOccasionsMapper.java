package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.SpecialOccasionsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link SpecialOccasions} and its DTO {@link SpecialOccasionsDTO}.
 */
@Mapper(componentModel = "spring", uses = {AcademicSessionMapper.class})
public interface SpecialOccasionsMapper extends EntityMapper<SpecialOccasionsDTO, SpecialOccasions> {

    @Mapping(source = "academicSession.id", target = "academicSessionId")
    SpecialOccasionsDTO toDto(SpecialOccasions specialOccasions);

    @Mapping(source = "academicSessionId", target = "academicSession")
    SpecialOccasions toEntity(SpecialOccasionsDTO specialOccasionsDTO);

    default SpecialOccasions fromId(String id) {
        if (id == null) {
            return null;
        }
        SpecialOccasions specialOccasions = new SpecialOccasions();
        specialOccasions.setId(id);
        return specialOccasions;
    }
}
