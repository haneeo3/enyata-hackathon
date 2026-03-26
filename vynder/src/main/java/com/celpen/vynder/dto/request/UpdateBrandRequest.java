package com.celpen.vynder.dto.request;

import lombok.Data;

@Data
public class UpdateBrandRequest {

    private Long brandId;

    private String companyName;
    private String industry;
    private String website;
    private String description;
}
