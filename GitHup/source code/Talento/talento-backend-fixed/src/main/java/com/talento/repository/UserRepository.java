package com.talento.repository;

import com.talento.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    /** Fetch user with skills in a single query (avoids N+1). */
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.skills WHERE u.id = :id")
    Optional<User> findByIdWithSkills(@Param("id") String id);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.skills WHERE u.email = :email")
    Optional<User> findByEmailWithSkills(@Param("email") String email);
}
