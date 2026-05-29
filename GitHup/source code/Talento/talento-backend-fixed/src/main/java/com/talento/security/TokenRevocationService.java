package com.talento.security;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Slf4j
@Component
@RequiredArgsConstructor
public class TokenRevocationService {

    private static final String REVOKED_TOKEN_KEY_PREFIX = "revoked_token:";

    private final RedisTemplate<String, String> redisTemplate;
    private final JwtUtil jwtUtil;

    public void revokeToken(String token) {
        try {
            LocalDateTime expiryTime = jwtUtil.extractExpiry(token);
            Instant now = Instant.now();
            Instant expiryInstant = expiryTime
                .atZone(ZoneId.systemDefault())
                .toInstant();

            long ttlSeconds = java.time.temporal.ChronoUnit.SECONDS.between(now, expiryInstant);

            if (ttlSeconds > 0) {
                String key = REVOKED_TOKEN_KEY_PREFIX + token;
                redisTemplate.opsForValue().set(key, "revoked", Duration.ofSeconds(ttlSeconds));
                log.info("Token revoked. TTL: {} seconds", ttlSeconds);
            } else {
                log.warn("Token already expired, no need to revoke");
            }
        } catch (Exception e) {
            log.error("Failed to revoke token", e);
            throw new RuntimeException("Token revocation failed", e);
        }
    }

    public boolean isRevoked(String token) {
        try {
            String key = REVOKED_TOKEN_KEY_PREFIX + token;
            Boolean isRevoked = redisTemplate.hasKey(key);

            if (isRevoked != null && isRevoked) {
                log.debug("Token is revoked");
                return true;
            }
            return false;
        } catch (Exception e) {
            log.error("Failed to check token revocation status", e);
            // Fail open when Redis is unavailable so the API stays reachable
            return false;
        }
    }

    public void revokeAllUserTokens(String userId) {
        try {
            String pattern = REVOKED_TOKEN_KEY_PREFIX + "user:" + userId + ":*";
            redisTemplate.delete(redisTemplate.keys(pattern));
            log.info("All tokens revoked for user: {}", userId);
        } catch (Exception e) {
            log.error("Failed to revoke all tokens for user: {}", userId, e);
        }
    }
}
