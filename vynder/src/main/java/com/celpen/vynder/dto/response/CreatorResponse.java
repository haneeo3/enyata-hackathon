package com.celpen.vynder.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreatorResponse {

    private Long id;
    private String name;
    private String niche;
    private int followers;
    private double engagementRate;

    private String email;

}
