package com.talento.service;

import com.talento.dto.UserDTO;
import com.talento.entity.User;
import com.talento.exception.ResourceNotFoundException;
import com.talento.repository.UserRepository;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO createUser(String username, String email, String rawPassword) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));

        User saved = userRepository.save(user);
        return new UserDTO(saved.getId(), saved.getUsername(), saved.getEmail());
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
