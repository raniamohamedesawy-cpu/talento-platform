package com.talento.security;

import com.talento.entity.User;
import com.talento.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TalentoUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /** Used by Spring Security's DaoAuthenticationProvider (login by email). */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        return toUserDetails(user);
    }

    /** Used by JwtAuthFilter (subsequent requests identified by user id). */
    public UserDetails loadUserById(String id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + id));
        return toUserDetails(user);
    }

    private UserDetails toUserDetails(User user) {
        return new org.springframework.security.core.userdetails.User(
            user.getId(),           // principal = user id (not email)
            user.getPasswordHash(),
            List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
