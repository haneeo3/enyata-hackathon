package com.celpen.vynder.dto.request;


import lombok.Data;

@Data
public class InitializePaymentRequest {

    private String brandEmail;
    private Long campaignId;
    private double amount;

}
