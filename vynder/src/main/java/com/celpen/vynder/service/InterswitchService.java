package com.celpen.vynder.service;

import com.celpen.vynder.model.Payment;

public interface InterswitchService {

    Payment initializePayment(Payment payment);

    Payment payCreator(Payment payment);

}

