package com.talento;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing         // ✅ Enable JPA auditing (createdAt, updatedAt)
@EnableCaching             // ✅ Enable Spring caching
@EnableAsync               // ✅ Enable async method execution
public class TalentoApplication {
    public static void main(String[] args) {
        SpringApplication.run(TalentoApplication.class, args);
    }
}
