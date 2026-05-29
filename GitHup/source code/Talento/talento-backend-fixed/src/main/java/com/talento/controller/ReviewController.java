package com.talento.controller;

import com.talento.entity.Review;
import com.talento.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public Review create(@AuthenticationPrincipal UserDetails principal, @RequestBody Review review) {
        String userId = principal.getUsername();
        return reviewService.create(userId, review);
    }

    @GetMapping("/user/{id}")
    public List<Review> userReviews(@PathVariable("id") String id) {
        return reviewService.userReviews(id);
    }
}

