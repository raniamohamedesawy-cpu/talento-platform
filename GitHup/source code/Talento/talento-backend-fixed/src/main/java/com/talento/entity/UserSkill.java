package com.talento.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_skills",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "skill_name", "type"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Storing skill name directly (no separate skill table) keeps it simple
    // and matches the frontend's string[] approach.
    @Column(name = "skill_name", nullable = false, length = 100)
    private String skillName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SkillType type;          // OFFERED | WANTED

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Proficiency proficiency; // BEGINNER | INTERMEDIATE | ADVANCED | EXPERT

    @Column
    private Integer yearsExperience;

    public enum SkillType {
        OFFERED, WANTED
    }

    public enum Proficiency {
        BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
    }
}
