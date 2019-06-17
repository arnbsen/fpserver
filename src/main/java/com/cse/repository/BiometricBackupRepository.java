package com.cse.repository;

import com.cse.domain.BiometricBackup;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the BiometricBackup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BiometricBackupRepository extends MongoRepository<BiometricBackup, String> {

}
