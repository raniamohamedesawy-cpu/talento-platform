package com.talento.service;

import com.talento.dto.request.LoginRequest;
import com.talento.dto.request.RegisterRequest;
import com.talento.dto.request.UpdateProfileRequest;
import com.talento.dto.response.AuthResponse;
import com.talento.dto.response.UserDTO;
import com.talento.entity.User;
import com.talento.exception.ConflictException;
import com.talento.exception.ResourceNotFoundException;
import com.talento.repository.UserRepository;
import com.talento.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository       userRepository;
    private final PasswordEncoder      passwordEncoder;
    private final JwtUtil              jwtUtil;
    private final AuthenticationManager authManager;

    // ── Register ─────────────────────────────────────────────────────────────

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ConflictException("Email already registered: " + req.getEmail());
        }

        User user = User.builder()
            .name(req.getName())
            .email(req.getEmail())
            .passwordHash(passwordEncoder.encode(req.getPassword()))
            .title(req.getTitle())
            .location(req.getLocation())
            .avatar(buildAvatar(req.getName()))
            .build();

        User saved = userRepository.save(user);
        log.info("New user registered: {} ({})", saved.getName(), saved.getId());

        return buildAuthResponse(saved);
    }

    // ── Login ─────────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest req) {
        try {
            authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
            );
        } catch (AuthenticationException ex) {
            throw new com.talento.exception.UnauthorizedException("Invalid email or password");
        }

        User user = userRepository.findByEmailWithSkills(req.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        log.info("User logged in: {} ({})", user.getName(), user.getId());
        return buildAuthResponse(user);
    }

    // ── Get current user ──────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public UserDTO getMe(String userId) {
        User user = userRepository.findByIdWithSkills(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserDTO.from(user);
    }

    // ── Update profile ────────────────────────────────────────────────────────

    @Transactional
    public UserDTO updateProfile(String userId, UpdateProfileRequest req) {
        User user = userRepository.findByIdWithSkills(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (req.getName()     != null) user.setName(req.getName());
        if (req.getTitle()    != null) user.setTitle(req.getTitle());
        if (req.getLocation() != null) user.setLocation(req.getLocation());
        if (req.getBio()      != null) user.setBio(req.getBio());

        // Notification preferences
        if (req.getNotifSessionReminders() != null) user.setNotifSessionReminders(req.getNotifSessionReminders());
        if (req.getNotifNewMessages()      != null) user.setNotifNewMessages(req.getNotifNewMessages());
        if (req.getNotifMatchAlerts()      != null) user.setNotifMatchAlerts(req.getNotifMatchAlerts());

        // Privacy preferences
        if (req.getProfilePublic()    != null) user.setProfilePublic(req.getProfilePublic());
        if (req.getShowLocation()     != null) user.setShowLocation(req.getShowLocation());
        if (req.getShowOnlineStatus() != null) user.setShowOnlineStatus(req.getShowOnlineStatus());

        return UserDTO.from(userRepository.save(user));
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private AuthResponse buildAuthResponse(User user) {
        String token = jwtUtil.generateToken(user.getId(), user.getEmail());
        // Stable ISO-8601 timestamp (UTC) to avoid locale/system-default differences
        String expiresAt = jwtUtil.extractExpiry(token).atZone(ZoneId.systemDefault())
            .withZoneSameInstant(ZoneId.of("UTC"))
            .toOffsetDateTime()
            .toString();
        return AuthResponse.builder()

            .token(token)
            .tokenType("Bearer")
            .expiresAt(expiresAt)
            .user(UserDTO.from(user))
            .build();
    }

    private String buildAvatar(String name) {
        if (name == null || name.isBlank()) return "??";
        String[] parts = name.trim().split("\\s+");
        if (parts.length == 1) return parts[0].substring(0, Math.min(2, parts[0].length())).toUpperCase();
        return (String.valueOf(parts[0].charAt(0)) + String.valueOf(parts[parts.length - 1].charAt(0))).toUpperCase();
    }
}
