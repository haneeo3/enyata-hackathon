package com.celpen.vynder.service.implementation;

import com.celpen.vynder.model.Payment;
import com.celpen.vynder.model.PaymentStatus;
import com.celpen.vynder.repo.PaymentRepository;
import com.celpen.vynder.service.InterswitchService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class InterswitchServiceImpl implements InterswitchService {

    private final PaymentRepository paymentRepository;

    private final String clientId = "<YOUR_CLIENT_ID>";
    private final String clientSecret = "<YOUR_CLIENT_SECRET>";
    private final String baseUrl = "https://sandbox.interswitchng.com";

    private final RestTemplate restTemplate = new RestTemplate();


    // Step 1: Get OAuth token
    private String getAccessToken() {
        String auth = clientId + ":" + clientSecret;
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + encodedAuth);
        headers.add("Content-Type", "application/json");

        HttpEntity<String> entity = new HttpEntity<>("", headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                baseUrl + "/api/v2/oauth/token",
                HttpMethod.POST,
                entity,
                Map.class
        );

        return (String) response.getBody().get("access_token");
    }

    // Step 2: Initialize Payment
    public Payment initializePayment(Payment payment) {
        try {
            String token = getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + token);

            Map<String, Object> body = new HashMap<>();
            body.put("amount", payment.getAmount());
            body.put("transactionRef", payment.getTransactionRef());
            body.put("currency", "NGN");
            body.put("redirectUrl", "http://localhost:5173/payment-success");

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    baseUrl + "/api/v2/payments/initiate",
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            // Example: update status if API returns success
            Map<String, Object> data = response.getBody();
            payment.setStatus(PaymentStatus.PENDING);
            paymentRepository.save(payment);

        } catch (Exception e) {
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
            throw new RuntimeException("Interswitch payment failed: " + e.getMessage());
        }

        return payment;
    }

    @Transactional
    public Payment payCreator(Payment payment) {

        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            throw new RuntimeException("Payment already processed");
        }

        try {
            String token = getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(token);


            Map<String, Object> body = new HashMap<>();
            body.put("amount", payment.getAmount());
            body.put("transactionRef", payment.getTransactionRef());
            body.put("destinationAccount", "<CREATOR_ACCOUNT_NUMBER>");
            body.put("bankCode", "<CREATOR_BANK_CODE>");

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    baseUrl + "/api/v2/transfer",
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Transfer failed");
            }

            payment.setStatus(PaymentStatus.SUCCESS);
            paymentRepository.save(payment);

        } catch (Exception e) {
            payment.setStatus(PaymentStatus.FAILED);
            paymentRepository.save(payment);
            throw new RuntimeException("Interswitch disbursement failed: " + e.getMessage());
        }

        return payment;
    }
}