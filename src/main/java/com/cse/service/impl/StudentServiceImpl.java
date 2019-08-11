package com.cse.service.impl;

import com.cse.service.StudentService;
import com.cse.domain.Authority;
import com.cse.domain.Student;
import com.cse.domain.User;
import com.cse.repository.StudentRepository;
import com.cse.repository.UserRepository;
import com.cse.service.dto.StudentDTO;
import com.cse.service.mapper.StudentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Student}.
 */
@Service
public class StudentServiceImpl implements StudentService {

    private final Logger log = LoggerFactory.getLogger(StudentServiceImpl.class);

    private final StudentRepository studentRepository;

    private final StudentMapper studentMapper;

    private final UserRepository userRepository;

    public StudentServiceImpl(StudentRepository studentRepository, StudentMapper studentMapper, UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
        this.userRepository = userRepository;
    }

    /**
     * Save a student.
     *
     * @param studentDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public StudentDTO save(StudentDTO studentDTO) {
        log.debug("Request to save Student : {}", studentDTO);
        Student student = studentMapper.toEntity(studentDTO);
        User user = userRepository.findById(student.getUser().getId()).get();
        Set<Authority> auth = student.getUser().getAuthorities();
        Authority authr = new Authority();
        authr.setName("ROLE_USER");
        auth.add(authr);
        authr = new Authority();
        authr.setName("ROLE_STUDENT");
        auth.add(authr);
        user.setAuthorities(auth);
        userRepository.save(user);
        student.setUser(user);
        student = studentRepository.save(student);
        return studentMapper.toDto(student);
    }

    /**
     * Get all the students.
     *
     * @return the list of entities.
     */
    @Override
    public List<StudentDTO> findAll() {
        log.debug("Request to get all Students");
        return studentRepository.findAll().stream()
            .map(studentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one student by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<StudentDTO> findOne(String id) {
        log.debug("Request to get Student : {}", id);
        return studentRepository.findById(id)
            .map(studentMapper::toDto);
    }

    /**
     * Delete the student by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Student : {}", id);
        studentRepository.deleteById(id);
    }

    @Override
    public Optional<StudentDTO> findByUserID(String id) {
        return studentRepository.findByUserID(id).map(studentMapper::toDto);
    }

    @Override
    public Optional<Student> findRaw(String id) {
        return studentRepository.findById(id);
    }

    @Override
    public List<StudentDTO> findByDepartment(String id) {
        return studentMapper.toDto(studentRepository.findByDepartmentID(id));
    }

    @Override
    public List<StudentDTO> findBySemesterAndYearAndDepartment(Integer year, Integer sem, String dept) {
        return studentMapper.toDto(studentRepository.findBySemesterAndYearAndSem(year, sem));
    }

    @Override
    public Boolean upgradeSemester() {
        List<Student> students = studentRepository.findAll();
        students.forEach(action -> {
           if (action.getCurrentSem() != null && action.getCurrentSem() % 2 != 0) {
               action.setCurrentSem(action.getCurrentSem() + 1);
           }
       });
       studentRepository.saveAll(students);
       return true;
    }

    @Override
    public List<StudentDTO> findAllAndRemoveLastYearStudents() {
        List<Student> retList = studentRepository.findBySemesterAndYearAndSem(4, 8);
        retList.forEach(student -> {
            studentRepository.deleteById(student.getId());
        });
        return studentMapper.toDto(retList);
    }

}
