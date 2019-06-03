package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.IntermdiateUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link IntermdiateUser} and its DTO {@link IntermdiateUserDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface IntermdiateUserMapper extends EntityMapper<IntermdiateUserDTO, IntermdiateUser> {



    default IntermdiateUser fromId(String id) {
        if (id == null) {
            return null;
        }
        IntermdiateUser intermdiateUser = new IntermdiateUser();
        intermdiateUser.setId(id);
        return intermdiateUser;
    }
}
