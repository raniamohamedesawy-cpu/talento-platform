package com.talento.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "credit_transactions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CreditTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private TransactionType type;   // EARNED | SPENT

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false, length = 255)
    private String description;

    // Optional FK to session that triggered this transaction
    @Column(name = "session_id")
    private Long sessionId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public enum TransactionType {
        EARNED, SPENT
    }
}
