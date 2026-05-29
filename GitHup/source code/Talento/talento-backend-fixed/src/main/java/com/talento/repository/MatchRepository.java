package com.talento.repository;

import com.talento.entity.Match;
import com.talento.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findByRequester(User requester);
}

