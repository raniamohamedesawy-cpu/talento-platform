package com.talento.controller;

import com.talento.entity.Session;
import com.talento.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final SessionService sessionService;

    @GetMapping("/upcoming")
    public List<Session> upcoming(@AuthenticationPrincipal UserDetails principal) {
        String userId = principal.getUsername();
        return sessionService.upcoming(userId);
    }

    @GetMapping("/past")
    public List<Session> past(@AuthenticationPrincipal UserDetails principal) {
        String userId = principal.getUsername();
        return sessionService.past(userId);
    }

    @PostMapping("/book")
    public Session book(@AuthenticationPrincipal UserDetails principal, @RequestBody Session session) {
        String userId = principal.getUsername();
        return sessionService.book(userId, session);
    }

    @PutMapping("/{id}/cancel")
    public Session cancel(@AuthenticationPrincipal UserDetails principal, @PathVariable("id") Long id) {
        String userId = principal.getUsername();
        return sessionService.cancel(userId, id);
    }
}

