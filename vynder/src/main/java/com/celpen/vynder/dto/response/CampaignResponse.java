package com.celpen.vynder.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CampaignResponse {


    private Long id;
    private String title;
    private String description;
    private double budget;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    private String brandName;
    private String brandEmail;


}
