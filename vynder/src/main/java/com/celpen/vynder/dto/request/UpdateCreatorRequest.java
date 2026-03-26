package com.celpen.vynder.dto.request;


import lombok.Data;

@Data
public class UpdateCreatorRequest {

    private Long CreatorId;

    private String name;           // Display name
    private String niche;          // Tech, Lifestyle, etc.
    private int followers;         // Number of followers
    private double engagementRate;

}
