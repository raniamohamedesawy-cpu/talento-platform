package com.talento.repository;

import com.talento.entity.Conversation;
import com.talento.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    Optional<Conversation> findByUser1AndUser2(User user1, User user2);
}

