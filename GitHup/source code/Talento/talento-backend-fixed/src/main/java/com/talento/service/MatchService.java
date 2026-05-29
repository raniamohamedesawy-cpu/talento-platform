package com.talento.service;

import com.talento.entity.Match;
import com.talento.entity.User;
import com.talento.entity.UserSkill;
import com.talento.repository.MatchRepository;
import com.talento.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MatchService {

    private final MatchRepository matchRepository;
    private final UserRepository userRepository;

    /**
     * Simple matching engine:
     * - For each other user, compute a score based on overlap between
     *   current user's OFFERED skills and other user's WANTED skills,
     *   plus current user's WANTED skills vs other user's OFFERED skills.
     */
    @Transactional
    public List<Match> searchMatches(String currentUserId) {
        User currentUser = userRepository.findById(currentUserId)
            .orElseThrow(() -> new com.talento.exception.ResourceNotFoundException("User not found"));

        List<User> users = userRepository.findAll();

        return users.stream()
            .filter(u -> !u.getId().equals(currentUser.getId()))
            .map(u -> buildMatch(currentUser, u))
            .sorted(Comparator.comparing(Match::getScore, Comparator.nullsLast(Comparator.reverseOrder())))
            .map(matchRepository::save)
            .toList();
    }

    private Match buildMatch(User currentUser, User other) {
        var currentOffered = currentUser.getSkills().stream()
            .filter(s -> s.getType() == UserSkill.SkillType.OFFERED)
            .map(UserSkill::getSkillName)
            .toList();

        var currentWanted = currentUser.getSkills().stream()
            .filter(s -> s.getType() == UserSkill.SkillType.WANTED)
            .map(UserSkill::getSkillName)
            .toList();

        var otherOffered = other.getSkills().stream()
            .filter(s -> s.getType() == UserSkill.SkillType.OFFERED)
            .map(UserSkill::getSkillName)
            .toList();

        var otherWanted = other.getSkills().stream()
            .filter(s -> s.getType() == UserSkill.SkillType.WANTED)
            .map(UserSkill::getSkillName)
            .toList();

        long overlap1 = currentOffered.stream().filter(otherWanted::contains).count();
        long overlap2 = currentWanted.stream().filter(otherOffered::contains).count();

        double score = Math.min(100.0, (overlap1 * 40.0) + (overlap2 * 40.0) + 10.0);

        // Choose representative skills for UI
        String offeredSkill = currentOffered.isEmpty() ? null : currentOffered.get(0);
        String wantedSkill = currentWanted.isEmpty() ? null : currentWanted.get(0);

        return Match.builder()
            .requester(currentUser)
            .matchedUser(other)
            .offeredSkill(offeredSkill)
            .wantedSkill(wantedSkill)
            .score(score)
            .connected(false)
            .createdAt(LocalDateTime.now())
            .build();
    }

    @Transactional(readOnly = true)
    public List<Match> getMatches(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new com.talento.exception.ResourceNotFoundException("User not found"));
        return matchRepository.findByRequester(user);
    }

    @Transactional
    public Match connect(String userId, Long matchId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new com.talento.exception.ResourceNotFoundException("User not found"));

        Match match = matchRepository.findById(matchId)
            .orElseThrow(() -> new com.talento.exception.ResourceNotFoundException("Match not found"));

        // Only requester can connect
        if (!match.getRequester().getId().equals(user.getId())) {
            throw new com.talento.exception.UnauthorizedException("Not allowed");
        }

        match.setConnected(true);
        return matchRepository.save(match);
    }
}

