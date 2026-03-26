package com.celpen.vynder.service;

import com.celpen.vynder.dto.request.LoginRequest;
import com.celpen.vynder.dto.request.SignupRequest;
import com.celpen.vynder.dto.response.AuthResponse;
import com.celpen.vynder.model.User;

public interface AuthService {

    AuthResponse signup(SignupRequest request);

    AuthResponse login(LoginRequest request);

    User getUserEntityByEmail(String email);

}
