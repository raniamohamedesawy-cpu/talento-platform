package com.talento.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.regex.Pattern;

@Slf4j
@Component
@RequiredArgsConstructor
public class PasswordValidator {

    private static final String PASSWORD_PATTERN =
        "^(?=.*[A-Z])"
            + "(?=.*[a-z])"
            + "(?=.*\\d)"
            + "(?=.*[@$!%*?&])"
            + ".{14,}$";

    private static final Pattern PATTERN = Pattern.compile(PASSWORD_PATTERN);

    private final RestTemplate restTemplate;

    public void validate(String password, String email) throws IllegalArgumentException {
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }

        if (password.length() < 14) {
            throw new IllegalArgumentException(
                "Password must be at least 14 characters long (current: " + password.length() + ")"
            );
        }

        if (!PATTERN.matcher(password).matches()) {
            throw new IllegalArgumentException(
                "Password must contain: uppercase letter, lowercase letter, digit, and special character (@$!%*?&)"
            );
        }

        String emailUsername = email.split("@")[0].toLowerCase();
        if (password.toLowerCase().contains(emailUsername)) {
            throw new IllegalArgumentException("Password cannot contain your email username");
        }

        if (isPasswordBreached(password)) {
            throw new IllegalArgumentException(
                "This password has been found in public data breaches. Please choose a different password."
            );
        }

        log.debug("Password validation successful for email: {}", email);
    }

    private boolean isPasswordBreached(String password) {
        try {
            String sha1Hash = DigestUtils.sha1Hex(password).toUpperCase();
            String prefix = sha1Hash.substring(0, 5);
            String suffix = sha1Hash.substring(5);

            String url = "https://api.pwnedpasswords.com/range/" + prefix;
            String response = restTemplate.getForObject(url, String.class);

            if (response == null) {
                log.warn("Failed to get response from HaveIBeenPwned API");
                return false;
            }

            String[] hashes = response.split("\\r?\\n");
            for (String hash : hashes) {
                if (hash.startsWith(suffix)) {
                    log.warn("Password found in HaveIBeenPwned database");
                    return true;
                }
            }

            return false;
        } catch (Exception e) {
            log.warn("Failed to check HaveIBeenPwned database", e);
            return false;
        }
    }
}
