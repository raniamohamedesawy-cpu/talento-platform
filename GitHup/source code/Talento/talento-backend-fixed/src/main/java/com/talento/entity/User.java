package com.talento.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @JsonIgnore
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    // ── Profile ──────────────────────────────────────────────────
    @Column(length = 10)
    private String avatar;          // initials, e.g. "JD"

    @Column(length = 150)
    private String title;           // "Senior Frontend Developer"

    @Column(length = 100)
    private String location;

    @Column(columnDefinition = "TEXT")
    private String bio;

    // ── Reputation ────────────────────────────────────────────────
    @Column(nullable = false)
    @Builder.Default
    private Double rating = 0.0;

    @Column(name = "review_count", nullable = false)
    @Builder.Default
    private Integer reviewCount = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer level = 1;

    @Column(name = "xp_points", nullable = false)
    @Builder.Default
    private Integer xpPoints = 0;

    // ── Credits ───────────────────────────────────────────────────
    @Column(name = "credits_balance", nullable = false)
    @Builder.Default
    private Integer creditsBalance = 45;    // matches frontend INITIAL_CREDITS

    // ── Skills (bidirectional) ────────────────────────────────────
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<UserSkill> skills = new ArrayList<>();

    // ── Settings (stored as JSON-ish columns for simplicity) ──────
    @Column(name = "notifications_session_reminders", nullable = false)
    @Builder.Default
    private Boolean notifSessionReminders = true;

    @Column(name = "notifications_new_messages", nullable = false)
    @Builder.Default
    private Boolean notifNewMessages = true;

    @Column(name = "notifications_match_alerts", nullable = false)
    @Builder.Default
    private Boolean notifMatchAlerts = true;

    @Column(name = "profile_public", nullable = false)
    @Builder.Default
    private Boolean profilePublic = true;

    @Column(name = "show_location", nullable = false)
    @Builder.Default
    private Boolean showLocation = true;

    @Column(name = "show_online_status", nullable = false)
    @Builder.Default
    private Boolean showOnlineStatus = true;

    // ── Timestamps ────────────────────────────────────────────────
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ── Helper ────────────────────────────────────────────────────
    public void addSkill(UserSkill skill) {
        skills.add(skill);
        skill.setUser(this);
    }

    public void removeSkill(UserSkill skill) {
        skills.remove(skill);
        skill.setUser(null);
    }
}
