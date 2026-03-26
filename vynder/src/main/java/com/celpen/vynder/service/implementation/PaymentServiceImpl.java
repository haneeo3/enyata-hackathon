package com.celpen.vynder.service.implementation;

import com.celpen.vynder.dto.request.InitializePaymentRequest;
import com.celpen.vynder.dto.response.AuthResponse;
import com.celpen.vynder.model.*;
import com.celpen.vynder.service.InterswitchService;
import com.celpen.vynder.repo.CampaignRepository;
import com.celpen.vynder.repo.PaymentRepository;
import com.celpen.vynder.service.AuthService;
import com.celpen.vynder.service.PaymentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final CampaignRepository campaignRepository;
    private final AuthService authService;
    private final InterswitchService interswitchService;


    public AuthResponse.PaymentResponse initializePayment(InitializePaymentRequest request) {

        // Validate brand
        User user = authService.getUserEntityByEmail(request.getBrandEmail());

        if (!user.getRole().name().equals("BRAND")) {
            throw new RuntimeException("Only brands can fund campaigns");
        }

        Campaign campaign = campaignRepository.findById(request.getCampaignId())
                .orElseThrow(() -> new RuntimeException("Campaign not found"));


        Payment payment = Payment.builder()
                .amount(request.getAmount())
                .status(PaymentStatus.PENDING)
                .transactionRef(generateRef())
                .createdAt(LocalDateTime.now())
                .campaign(campaign)
                .build();


        Payment saved = paymentRepository.save(payment);

        // 🔥 Call Interswitch API here
        interswitchService.initializePayment(payment);


        return mapToResponse(saved);
    }

    public void payCreator(Application app) {

        Payment payment = Payment.builder()
                .amount(app.getCampaign().getBudget())
                .status(PaymentStatus.PENDING)
                .transactionRef(generateRef())
                .createdAt(LocalDateTime.now())
                .campaign(app.getCampaign())
                .creator(app.getCreator())
                .build();

        Payment saved = paymentRepository.save(payment);

        // Call Interswitch transfer API

        interswitchService.payCreator(payment);
    }

//    private void callInterswitchAPI(Payment payment) {
//        // 🔥 MOCK for hackathon (IMPORTANT)
//        System.out.println("Calling Interswitch API for payment: " + payment.getTransactionRef());
//
//        // Simulate success
//        payment.setStatus(PaymentStatus.SUCCESS);
//        paymentRepository.save(payment);
//    }

    private String generateRef() {
        return "TXN_" + System.currentTimeMillis();
    }

    private AuthResponse.PaymentResponse mapToResponse(Payment p) {
        return AuthResponse.PaymentResponse.builder()
                .id(p.getId())
                .amount(p.getAmount())
                .status(p.getStatus().name())
                .transactionRef(p.getTransactionRef())
                .build();
    }

}
