package com.talento.controller;

import com.talento.entity.Match;
import com.talento.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
@RequiredArgsConstructor
public class MatchController {

    private final MatchService matchService;

    @PostMapping("/search")
    public List<Match> search(@AuthenticationPrincipal UserDetails principal) {
        String userId = principal.getUsername();
        return matchService.searchMatches(userId);
    }

    @GetMapping
    public List<Match> getMatches(@AuthenticationPrincipal UserDetails principal) {
        String userId = principal.getUsername();
        return matchService.getMatches(userId);
    }

    @PostMapping("/{id}/connect")
    public Match connect(@AuthenticationPrincipal UserDetails principal, @PathVariable("id") Long id) {
        String userId = principal.getUsername();
        return matchService.connect(userId, id);
    }
}

