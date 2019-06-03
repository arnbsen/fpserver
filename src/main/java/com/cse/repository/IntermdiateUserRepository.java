package com.cse.repository;

import com.cse.domain.IntermdiateUser;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the IntermdiateUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IntermdiateUserRepository extends MongoRepository<IntermdiateUser, String> {

}
