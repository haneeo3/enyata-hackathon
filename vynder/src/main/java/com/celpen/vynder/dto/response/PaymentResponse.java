package com.celpen.vynder.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponse {

    private Long id;
    private double amount;
    private String status;
    private String transactionRef;

}
