package com.talento.controller;

import com.talento.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final MessageService messageService;

    public record ChatSendPayload(Long conversationId, String content) {}

    @MessageMapping("/chat.send")
    public void send(@AuthenticationPrincipal UserDetails principal, @Payload ChatSendPayload payload) {
        String userId = principal.getUsername();
        messageService.send(userId, payload.conversationId(), payload.content());
    }
}

