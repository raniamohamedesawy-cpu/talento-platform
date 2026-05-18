package com.talento.controller;

import com.talento.entity.User;
import com.talento.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        if (userRepository.findByEmail(body.get("email")).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
        }
        User user = new User();
        user.setUsername(body.get("username"));
        user.setEmail(body.get("email"));
        user.setPassword(passwordEncoder.encode(body.get("password")));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        return userRepository.findByEmail(body.get("email"))
            .filter(u -> passwordEncoder.matches(body.get("password"), u.getPassword()))
            .map(u -> ResponseEntity.ok(Map.of("message", "Login successful", "username", u.getUsername())))
            .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
    }
}
