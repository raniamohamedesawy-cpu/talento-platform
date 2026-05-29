package com.talento.repository;

import com.talento.entity.Session;
import com.talento.entity.SessionStatus;
import com.talento.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByLearnerAndStatus(User learner, SessionStatus status);
}

