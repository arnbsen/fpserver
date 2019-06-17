package com.cse.service.mapper;

import com.cse.domain.*;
import com.cse.service.dto.AttendanceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Attendance} and its DTO {@link AttendanceDTO}.
 */
@Mapper(componentModel = "spring", uses = {DeviceMapper.class})
public interface AttendanceMapper extends EntityMapper<AttendanceDTO, Attendance> {

    @Mapping(source = "dev.id", target = "devId")
    AttendanceDTO toDto(Attendance attendance);

    @Mapping(source = "devId", target = "dev")
    Attendance toEntity(AttendanceDTO attendanceDTO);

    default Attendance fromId(String id) {
        if (id == null) {
            return null;
        }
        Attendance attendance = new Attendance();
        attendance.setId(id);
        return attendance;
    }
}
