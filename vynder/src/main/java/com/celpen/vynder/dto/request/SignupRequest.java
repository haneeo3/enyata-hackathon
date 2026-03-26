package com.celpen.vynder.dto.request;

import lombok.Data;

@Data
public class SignupRequest {

    private String email;
    private String password;
    private String role; // CREATOR or BRAND

}
