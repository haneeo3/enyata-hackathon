package com.celpen.vynder.model;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "payments")
@Builder
public class Payment extends AbstractEntity {


    private double amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String transactionRef;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private PaymentDirection direction;

    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private Creator creator;

}
