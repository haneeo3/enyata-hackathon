package com.celpen.vynder.dto.request;

import lombok.Data;

@Data
public class UpdateApplicationStatusRequest {


    private Long applicationId;
    private String status; // APPROVED / REJECTED

}
