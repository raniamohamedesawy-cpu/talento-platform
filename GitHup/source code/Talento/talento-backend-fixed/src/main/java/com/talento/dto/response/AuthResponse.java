package com.talento.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Returned by POST /api/auth/login and POST /api/auth/register.
 * The frontend stores the token and attaches it as:
 *   Authorization: Bearer <token>
 *
 * FIX: expiresAt changed from LocalDateTime to String to avoid
 *      Jackson serializing it as an integer array [2026,5,25,10,30,0]
 *      which the frontend cannot parse correctly.
 */
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class AuthResponse {

    private String token;
    private String tokenType;       // always "Bearer"
    private String expiresAt;       // ISO-8601 string e.g. "2026-05-26T10:30:00"
    private UserDTO user;           // full profile so frontend can populate context immediately
}
