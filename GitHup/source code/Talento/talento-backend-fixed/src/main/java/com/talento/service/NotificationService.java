package com.talento.service;

import com.talento.service.observer.NotificationObserver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final List<NotificationObserver> observers;

    public void send(String message, String userId) {
        for (NotificationObserver observer : observers) {
            observer.notify(message, userId);
        }
    }
}

