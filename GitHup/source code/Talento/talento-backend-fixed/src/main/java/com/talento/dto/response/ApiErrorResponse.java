package com.talento.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Consistent error envelope returned for all 4xx / 5xx responses.
 * The frontend can always read response.data.message.
 */
@Data @Builder
public class ApiErrorResponse {

    private int     status;
    private String  error;
    private String  message;
    private String  path;
    private LocalDateTime timestamp;
    private Map<String, String> fieldErrors;  // validation errors, nullable
}
