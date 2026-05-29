package com.talento.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User requester;

    @ManyToOne(optional = false)
    private User matchedUser;

    private String offeredSkill;

    private String wantedSkill;

    private Double score;

    @Builder.Default
    private Boolean connected = false;

    private LocalDateTime createdAt;
}

