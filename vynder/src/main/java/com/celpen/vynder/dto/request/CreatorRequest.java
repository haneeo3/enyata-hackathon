package com.celpen.vynder.dto.request;

import com.celpen.vynder.model.User;
import lombok.Data;

@Data
public class CreatorRequest {

    private String email;   // Auth email

    private String password; // Auth password

    private User user;

    private String name;

    private String niche;

    private int followers;

    private double engagementRate;



}
