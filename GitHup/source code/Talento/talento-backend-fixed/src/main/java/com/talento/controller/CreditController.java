package com.talento.controller;

import com.talento.entity.CreditTransaction;
import com.talento.entity.User;
import com.talento.repository.CreditTransactionRepository;
import com.talento.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/credits")
@RequiredArgsConstructor
public class CreditController {

    private final UserRepository userRepository;
    private final CreditTransactionRepository creditTransactionRepository;

    @GetMapping("/balance")
    public Map<String, Integer> balance(@AuthenticationPrincipal UserDetails principal) {
        String userId = principal.getUsername();
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new com.talento.exception.ResourceNotFoundException("User not found"));
        return Map.of("credits", user.getCreditsBalance());
    }

    @GetMapping("/transactions")
    public List<CreditTransaction> transactions(@AuthenticationPrincipal UserDetails principal) {
        String userId = principal.getUsername();
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new com.talento.exception.ResourceNotFoundException("User not found"));
        return creditTransactionRepository.findByUserOrderByCreatedAtDesc(user);
    }

    @PostMapping("/earn")
    public Map<String, String> earn(@AuthenticationPrincipal UserDetails principal) {
        // Minimal stub (no admin flow specified)
        return Map.of("message", "Credits earn is not configured yet");
    }
}

