package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.AcademicSessionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link AcademicSession} and its DTO {@link AcademicSessionDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AcademicSessionMapper extends EntityMapper<AcademicSessionDTO, AcademicSession> {



    default AcademicSession fromId(String id) {
        if (id == null) {
            return null;
        }
        AcademicSession academicSession = new AcademicSession();
        academicSession.setId(id);
        return academicSession;
    }
}
