package com.celpen.vynder.dto.request;


import lombok.Data;

@Data
public class CreateBrandRequest {


    // auth
    private String email;

    // brand info
    private String companyName;
    private String industry;
    private String website;
    private String description;

}
