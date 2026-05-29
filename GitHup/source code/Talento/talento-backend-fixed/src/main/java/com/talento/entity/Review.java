package com.talento.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User reviewer;

    @ManyToOne(optional = false)
    private User reviewedUser;

    private Integer rating;

    @Column(length = 1000)
    private String comment;

    private LocalDateTime createdAt;
}

