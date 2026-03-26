package com.celpen.vynder.dto.request;

import lombok.Data;

@Data
public class CreateApplicationRequest {

    private String creatorEmail;
    private Long campaignId;

    private String message;

}

