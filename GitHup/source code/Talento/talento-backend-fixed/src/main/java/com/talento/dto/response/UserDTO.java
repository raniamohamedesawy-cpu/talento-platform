package com.talento.dto.response;

import com.talento.entity.User;
import com.talento.entity.UserSkill;
import lombok.Builder;
import lombok.Data;

import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * Safe public representation of a User.
 * Field names match the TypeScript User interface in types.ts:
 *
 *   id, name, avatar, title, location, rating, reviewCount,
 *   level, credits, offeredSkills, wantedSkills, joinedDate, bio
 */
@Data @Builder
public class UserDTO {

    private String  id;
    private String  name;
    private String  avatar;
    private String  title;
    private String  location;
    private Double  rating;
    private Integer reviewCount;
    private Integer level;
    private Integer credits;         // creditsBalance → credits (matches frontend)
    private List<String> offeredSkills;
    private List<String> wantedSkills;
    private String  joinedDate;      // "March 2025" format (matches mockUser)
    private String  bio;

    // Settings (only returned on own profile / /api/users/me)
    private Boolean notifSessionReminders;
    private Boolean notifNewMessages;
    private Boolean notifMatchAlerts;
    private Boolean profilePublic;
    private Boolean showLocation;
    private Boolean showOnlineStatus;

    private static final DateTimeFormatter JOINED_FMT =
        DateTimeFormatter.ofPattern("MMMM yyyy");

    /** Convert a User entity to UserDTO. */
    public static UserDTO from(User user) {
        List<String> offered = user.getSkills().stream()
            .filter(s -> s.getType() == UserSkill.SkillType.OFFERED)
            .map(UserSkill::getSkillName)
            .toList();

        List<String> wanted = user.getSkills().stream()
            .filter(s -> s.getType() == UserSkill.SkillType.WANTED)
            .map(UserSkill::getSkillName)
            .toList();

        return UserDTO.builder()
            .id(user.getId())
            .name(user.getName())
            .avatar(buildAvatar(user.getName()))
            .title(user.getTitle())
            .location(user.getLocation())
            .rating(user.getRating())
            .reviewCount(user.getReviewCount())
            .level(user.getLevel())
            .credits(user.getCreditsBalance())
            .offeredSkills(offered)
            .wantedSkills(wanted)
            .joinedDate(user.getCreatedAt() != null
                ? user.getCreatedAt().format(JOINED_FMT)
                : "")
            .bio(user.getBio())
            .notifSessionReminders(user.getNotifSessionReminders())
            .notifNewMessages(user.getNotifNewMessages())
            .notifMatchAlerts(user.getNotifMatchAlerts())
            .profilePublic(user.getProfilePublic())
            .showLocation(user.getShowLocation())
            .showOnlineStatus(user.getShowOnlineStatus())
            .build();
    }

    /** Generate initials avatar from full name ("John Doe" → "JD"). */
    private static String buildAvatar(String name) {
        if (name == null || name.isBlank()) return "??";
        String[] parts = name.trim().split("\\s+");
        if (parts.length == 1) return parts[0].substring(0, Math.min(2, parts[0].length())).toUpperCase();
        return (String.valueOf(parts[0].charAt(0)) + String.valueOf(parts[parts.length - 1].charAt(0))).toUpperCase();
    }
}
