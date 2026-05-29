package com.talento.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

    private final SecretKey key;
    private final long expirationMs;

    public JwtUtil(
        @Value("${talento.jwt.secret}") String secret,
        @Value("${talento.jwt.expiration-ms}") long expirationMs
    ) {
        // Contract: `talento.jwt.secret` must resolve to a 256-bit key.
        // We support either:
        //  - raw secret bytes (string will be UTF-8 encoded)
        //  - base64-encoded 32-byte key
        //
        // Note: previous logic was effectively encode->decode and is not a stable contract.
        byte[] secretBytes;
        try {
            // If it's base64 that decodes to 32 bytes, use it.
            byte[] decoded = Decoders.BASE64.decode(secret);
            secretBytes = (decoded.length == 32) ? decoded : null;
        } catch (Exception ignored) {
            secretBytes = null;
        }

        if (secretBytes == null) {
            secretBytes = secret.getBytes(java.nio.charset.StandardCharsets.UTF_8);
        }

        // Ensure key length is valid for HS256 (min 256 bits)
        if (secretBytes.length < 32) {
            throw new IllegalArgumentException(
                "talento.jwt.secret must provide at least 256 bits (32 bytes). " +
                "Provide a base64-encoded 32-byte key or a sufficiently long raw secret."
            );
        }

        this.key = Keys.hmacShaKeyFor(secretBytes);
        this.expirationMs = expirationMs;
    }


    /** Generate a signed JWT for the given user id. */
    public String generateToken(String userId, String email) {
        Date now    = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
            .subject(userId)
            .claim("email", email)
            .issuedAt(now)
            .expiration(expiry)
            .signWith(key)
            .compact();
    }

    /** Extract user id (subject) from token. */
    public String extractUserId(String token) {
        return parseClaims(token).getSubject();
    }

    /** Extract expiry as LocalDateTime for AuthResponse. */
    public LocalDateTime extractExpiry(String token) {
        Date expiry = parseClaims(token).getExpiration();
        return expiry.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

    /** True if token is signed by us and not expired. */
    public boolean isValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            log.warn("Invalid JWT: {}", ex.getMessage());
            return false;
        }
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }
}
