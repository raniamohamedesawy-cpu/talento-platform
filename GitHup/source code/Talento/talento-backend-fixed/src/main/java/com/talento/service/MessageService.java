package com.talento.service;

import com.talento.entity.*;
import com.talento.exception.ResourceNotFoundException;
import com.talento.repository.ConversationRepository;
import com.talento.repository.MessageRepository;
import com.talento.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Transactional
    public Message send(String senderId, Long conversationId, String content) {
        User sender = userRepository.findById(senderId)
            .orElseThrow(() -> new ResourceNotFoundException("Sender not found"));

        Conversation conversation = conversationRepository.findById(conversationId)
            .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

        Message saved = messageRepository.save(
            Message.builder()
                .conversation(conversation)
                .sender(sender)
                .content(content)
                .sentAt(LocalDateTime.now())
                .build()
        );

        // Notify the other participant
        User recipient = conversation.getUser1().getId().equals(sender.getId())
            ? conversation.getUser2()
            : conversation.getUser1();

        notificationService.send(saved.getContent(), recipient.getId());

        return saved;
    }

    @Transactional(readOnly = true)
    public List<Message> getConversationMessages(String userId, Long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId)
            .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

        if (!conversation.getUser1().getId().equals(userId) && !conversation.getUser2().getId().equals(userId)) {
            throw new com.talento.exception.UnauthorizedException("Not allowed");
        }

        return messageRepository.findByConversationIdOrderBySentAtAsc(conversationId);
    }
}

