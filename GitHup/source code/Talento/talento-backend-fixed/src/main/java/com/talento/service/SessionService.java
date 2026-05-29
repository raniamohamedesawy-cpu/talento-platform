package com.talento.service;

import com.talento.entity.*;
import com.talento.exception.ConflictException;
import com.talento.exception.ResourceNotFoundException;
import com.talento.repository.CreditTransactionRepository;
import com.talento.repository.SessionRepository;
import com.talento.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;
    private final CreditTransactionRepository creditTransactionRepository;

    @Transactional(readOnly = true)
    public List<Session> upcoming(String userId) {
        User learner = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return sessionRepository.findByLearnerAndStatus(learner, SessionStatus.UPCOMING);
    }

    @Transactional(readOnly = true)
    public List<Session> past(String userId) {
        User learner = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return sessionRepository.findByLearnerAndStatus(learner, SessionStatus.COMPLETED);
    }

    @Transactional
    public Session book(String userId, Session payload) {
        User learner = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (payload.getMentor() == null || payload.getCreditsUsed() == null) {
            throw new ConflictException("Missing mentor or creditsUsed");
        }

        int creditsUsed = payload.getCreditsUsed();
        if (learner.getCreditsBalance() == null || learner.getCreditsBalance() < creditsUsed) {
            throw new ConflictException("Insufficient credits");
        }

        learner.setCreditsBalance(learner.getCreditsBalance() - creditsUsed);

        User mentor = userRepository.findById(payload.getMentor().getId())
            .orElseThrow(() -> new ResourceNotFoundException("Mentor not found"));

        Session toSave = Session.builder()
            .mentor(mentor)
            .learner(learner)
            .skill(payload.getSkill())
            .sessionDate(payload.getSessionDate() != null ? payload.getSessionDate() : LocalDateTime.now())
            .durationMinutes(payload.getDurationMinutes())
            .status(SessionStatus.UPCOMING)
            .creditsUsed(creditsUsed)
            .build();

        Session saved = sessionRepository.save(toSave);

        // Record credit transaction
        creditTransactionRepository.save(
            CreditTransaction.builder()
                .user(learner)
                .type(CreditTransaction.TransactionType.SPENT)
                .amount(creditsUsed)
                .description("Session booking")
                .sessionId(saved.getId())
                .build()
        );

        return saved;
    }

    @Transactional
    public Session cancel(String userId, Long id) {
        User learner = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Session session = sessionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Session not found"));

        // Only learner can cancel
        if (!session.getLearner().getId().equals(learner.getId())) {
            throw new com.talento.exception.UnauthorizedException("Not allowed");
        }

        session.setStatus(SessionStatus.CANCELLED);
        return sessionRepository.save(session);
    }
}

