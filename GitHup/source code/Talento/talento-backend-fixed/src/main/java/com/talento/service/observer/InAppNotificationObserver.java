package com.talento.service.observer;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InAppNotificationObserver implements NotificationObserver {

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void notify(String message, String userId) {
        messagingTemplate.convertAndSend("/topic/messages/" + userId, message);
    }
}

