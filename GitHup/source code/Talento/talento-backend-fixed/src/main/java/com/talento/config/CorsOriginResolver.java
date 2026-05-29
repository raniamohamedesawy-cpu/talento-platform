package com.talento.config;

import org.springframework.core.env.Environment;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/** Resolves comma-separated CORS origins from Spring properties or env. */
public final class CorsOriginResolver {

    private CorsOriginResolver() {}

    public static List<String> resolve(Environment env) {
        String raw = env.getProperty("CORS_ALLOWED_ORIGINS");
        if (raw == null || raw.isBlank()) {
            raw = env.getProperty("talento.cors.allowed-origins");
        }
        if (raw == null || raw.isBlank()) {
            return List.of(
                "http://localhost:5173",
                "http://localhost:5174",
                "http://127.0.0.1:5174"
            );
        }
        return Arrays.stream(raw.split(","))
            .map(String::trim)
            .filter(s -> !s.isEmpty())
            .collect(Collectors.toList());
    }
}
