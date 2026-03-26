package com.celpen.vynder.service;

import com.celpen.vynder.dto.request.InitializePaymentRequest;
import com.celpen.vynder.dto.response.AuthResponse;
import com.celpen.vynder.model.Application;

public interface PaymentService {

    AuthResponse.PaymentResponse initializePayment(InitializePaymentRequest request);

    void payCreator(Application app);
}