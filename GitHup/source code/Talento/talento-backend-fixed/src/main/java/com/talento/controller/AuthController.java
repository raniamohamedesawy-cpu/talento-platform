package com.talento.controller;

import com.talento.dto.request.LoginRequest;
import com.talento.dto.request.RegisterRequest;
import com.talento.dto.request.UpdateProfileRequest;
import com.talento.dto.response.AuthResponse;
import com.talento.dto.response.UserDTO;
import com.talento.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // ── POST /api/auth/register ──────────────────────────────────────────────

    @PostMapping("/auth/register")
    public ResponseEntity<AuthResponse> register(
        @Valid @RequestBody RegisterRequest request
    ) {
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(authService.register(request));
    }

    // ── POST /api/auth/login ─────────────────────────────────────────────────

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponse> login(
        @Valid @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(authService.login(request));
    }

    // ── GET /api/users/me ────────────────────────────────────────────────────

    @GetMapping("/users/me")
    public ResponseEntity<UserDTO> getMe(
        @AuthenticationPrincipal UserDetails principal
    ) {
        return ResponseEntity.ok(authService.getMe(principal.getUsername()));
    }

    // ── PUT /api/users/me ────────────────────────────────────────────────────

    @PutMapping("/users/me")
    public ResponseEntity<UserDTO> updateProfile(
        @AuthenticationPrincipal UserDetails principal,
        @Valid @RequestBody UpdateProfileRequest request
    ) {
        return ResponseEntity.ok(
            authService.updateProfile(principal.getUsername(), request)
        );
    }
}
