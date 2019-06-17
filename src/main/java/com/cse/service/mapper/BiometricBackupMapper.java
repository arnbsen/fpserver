package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.BiometricBackupDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link BiometricBackup} and its DTO {@link BiometricBackupDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BiometricBackupMapper extends EntityMapper<BiometricBackupDTO, BiometricBackup> {



    default BiometricBackup fromId(String id) {
        if (id == null) {
            return null;
        }
        BiometricBackup biometricBackup = new BiometricBackup();
        biometricBackup.setId(id);
        return biometricBackup;
    }
}
