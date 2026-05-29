package com.talento.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProfileRequest {

    @Size(min = 2, max = 100)
    private String name;

    @Size(max = 150)
    private String title;

    @Size(max = 100)
    private String location;

    @Size(max = 1000)
    private String bio;

    // Notification preferences (Settings.tsx)
    private Boolean notifSessionReminders;
    private Boolean notifNewMessages;
    private Boolean notifMatchAlerts;

    // Privacy preferences
    private Boolean profilePublic;
    private Boolean showLocation;
    private Boolean showOnlineStatus;
}
