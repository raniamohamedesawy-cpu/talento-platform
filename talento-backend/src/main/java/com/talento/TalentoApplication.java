package com.talento;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class TalentoApplication {
    public static void main(String[] args) {
        SpringApplication.run(TalentoApplication.class, args);
    }
}
