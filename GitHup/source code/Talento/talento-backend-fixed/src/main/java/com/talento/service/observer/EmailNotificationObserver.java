package com.talento.service.observer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class EmailNotificationObserver implements NotificationObserver {

    @Override
    public void notify(String message, String userId) {
        // Stub: wire real email provider later
        log.info("[Email] userId={} message={}", userId, message);
    }
}

