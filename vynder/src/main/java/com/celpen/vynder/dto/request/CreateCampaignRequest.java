package com.celpen.vynder.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateCampaignRequest {

    private String brandEmail; // to identify brand

    private String title;
    private String description;
    private double budget;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
