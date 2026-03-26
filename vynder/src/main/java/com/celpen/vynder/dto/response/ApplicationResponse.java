package com.celpen.vynder.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ApplicationResponse {

    private Long id;
    private String message;
    private String status;
    private LocalDateTime createdAt;

    private String creatorName;
    private String creatorEmail;

    private String campaignTitle;
}

