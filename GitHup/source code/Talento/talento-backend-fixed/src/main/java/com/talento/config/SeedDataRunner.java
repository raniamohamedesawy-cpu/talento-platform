package com.talento.config;

import com.talento.entity.User;
import com.talento.entity.UserSkill;
import com.talento.repository.UserRepository;
import com.talento.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SeedDataRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MatchService matchService;

    @Override
    public void run(String... args) {
        List<User> seeds = List.of(
            buildSeedUser("React Developer", "react.dev@example.com", "RD", "Senior React Developer", "Cairo",
                "Building modern frontend experiences with React and TypeScript.",
                List.of(
                    createSkill("React", UserSkill.SkillType.OFFERED, UserSkill.Proficiency.EXPERT),
                    createSkill("TypeScript", UserSkill.SkillType.OFFERED, UserSkill.Proficiency.EXPERT),
                    createSkill("UI/UX Design", UserSkill.SkillType.WANTED, UserSkill.Proficiency.INTERMEDIATE),
                    createSkill("GraphQL", UserSkill.SkillType.WANTED, UserSkill.Proficiency.INTERMEDIATE)
                )
            ),
            buildSeedUser("UI/UX Designer", "ux.designer@example.com", "UX", "Product Designer", "Remote",
                "Designing scalable interfaces and delightful user experiences.",
                List.of(
                    createSkill("Figma", UserSkill.SkillType.OFFERED, UserSkill.Proficiency.EXPERT),
                    createSkill("Design Systems", UserSkill.SkillType.OFFERED, UserSkill.Proficiency.ADVANCED),
                    createSkill("React", UserSkill.SkillType.WANTED, UserSkill.Proficiency.INTERMEDIATE),
                    createSkill("JavaScript", UserSkill.SkillType.WANTED, UserSkill.Proficiency.INTERMEDIATE)
                )
            ),
            buildSeedUser("Spring Boot Developer", "spring.dev@example.com", "SB", "Backend Engineer", "Alexandria",
                "Creating backend APIs with Spring Boot, JPA, and microservices architecture.",
                List.of(
                    createSkill("Spring Boot", UserSkill.SkillType.OFFERED, UserSkill.Proficiency.EXPERT),
                    createSkill("Java", UserSkill.SkillType.OFFERED, UserSkill.Proficiency.EXPERT),
                    createSkill("AWS", UserSkill.SkillType.WANTED, UserSkill.Proficiency.INTERMEDIATE),
                    createSkill("React", UserSkill.SkillType.WANTED, UserSkill.Proficiency.INTERMEDIATE)
                )
            ),
            buildSeedUser("AI Engineer", "ai.engineer@example.com", "AI", "Machine Learning Engineer", "Cairo",
                "Building intelligent systems and deploying AI solutions.",
                List.of(
                    createSkill("Machine Learning", UserSkill.SkillType.OFFERED, UserSkill.Proficiency.EXPERT),
                    createSkill("Python", UserSkill.SkillType.OFFERED, UserSkill.Proficiency.EXPERT),
                    createSkill("Data Engineering", UserSkill.SkillType.WANTED, UserSkill.Proficiency.INTERMEDIATE),
                    createSkill("Cloud Architecture", UserSkill.SkillType.WANTED, UserSkill.Proficiency.INTERMEDIATE)
                )
            )
        );

        seeds.forEach(seed -> {
            if (!userRepository.existsByEmail(seed.getEmail())) {
                User saved = userRepository.save(seed);
                matchService.searchMatches(saved.getId());
            }
        });
    }

    private User buildSeedUser(String name,
                               String email,
                               String avatar,
                               String title,
                               String location,
                               String bio,
                               List<UserSkill> skills) {
        User user = User.builder()
            .name(name)
            .email(email)
            .passwordHash(passwordEncoder.encode("Password123"))
            .avatar(avatar)
            .title(title)
            .location(location)
            .bio(bio)
            .build();
        skills.forEach(user::addSkill);
        return user;
    }

    private UserSkill createSkill(String name,
                                  UserSkill.SkillType type,
                                  UserSkill.Proficiency proficiency) {
        return UserSkill.builder()
            .skillName(name)
            .type(type)
            .proficiency(proficiency)
            .yearsExperience(2)
            .build();
    }
}
