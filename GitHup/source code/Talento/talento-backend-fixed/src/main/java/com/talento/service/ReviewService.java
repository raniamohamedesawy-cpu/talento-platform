package com.talento.service;

import com.talento.entity.Review;
import com.talento.entity.User;
import com.talento.exception.ResourceNotFoundException;
import com.talento.repository.ReviewRepository;
import com.talento.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    @Transactional
    public Review create(String reviewerId, Review payload) {
        if (payload.getReviewedUser() == null || payload.getRating() == null) {
            throw new com.talento.exception.ConflictException("Missing reviewedUser or rating");
        }

        User reviewer = userRepository.findById(reviewerId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        User reviewed = userRepository.findById(payload.getReviewedUser().getId())
            .orElseThrow(() -> new ResourceNotFoundException("Reviewed user not found"));

        Review saved = reviewRepository.save(
            Review.builder()
                .reviewer(reviewer)
                .reviewedUser(reviewed)
                .rating(payload.getRating())
                .comment(payload.getComment())
                .createdAt(LocalDateTime.now())
                .build()
        );

        // Lightweight aggregate update
        int count = reviewed.getReviewCount() == null ? 0 : reviewed.getReviewCount();
        double rating = reviewed.getRating() == null ? 0.0 : reviewed.getRating();

        double newAvg = ((rating * count) + payload.getRating()) / (count + 1);
        reviewed.setReviewCount(count + 1);
        reviewed.setRating(newAvg);
        userRepository.save(reviewed);

        return saved;
    }

    @Transactional(readOnly = true)
    public List<Review> userReviews(String userId) {
        // payload expects path user/{id} where id is reviewed user's id
        return reviewRepository.findByReviewedUserId(userId);
    }
}

