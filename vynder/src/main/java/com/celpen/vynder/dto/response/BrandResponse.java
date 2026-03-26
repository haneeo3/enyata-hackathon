package com.celpen.vynder.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BrandResponse{

    private Long id;

    private String companyName;

    private String industry;

    private String website;

    private String description;

    private String email; // optional (from User)


}
