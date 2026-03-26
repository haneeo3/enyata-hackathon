package com.celpen.vynder.service.implementation;

import com.celpen.vynder.dto.request.LoginRequest;
import com.celpen.vynder.dto.request.SignupRequest;
import com.celpen.vynder.dto.response.AuthResponse;
import com.celpen.vynder.model.Role;
import com.celpen.vynder.model.User;
import com.celpen.vynder.repo.UserRepository;
import com.celpen.vynder.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {



    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;



    // Signup user
    public AuthResponse signup(SignupRequest request) {

        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        if (request.getRole() == null || request.getRole().isEmpty()) {
            throw new RuntimeException("Role is required");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        Role userRole;

        String roleStr = request.getRole().toUpperCase();

        if (roleStr.equals("BRAND")) {
            userRole = Role.BRAND;
        } else if (roleStr.equals("CREATOR")) {
            userRole = Role.CREATOR;
        } else {
            throw new RuntimeException("Invalid role");

        }

        String endodedPassword = passwordEncoder.encode(request.getPassword());

        User user = User.builder()
                .email(request.getEmail())
                .password(endodedPassword)
                .role(userRole)
                .build();

        User saved = userRepository.save(user);

        return mapToResponse(saved);
    }


    // Login user
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));


        //Password Checker
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return mapToResponse(user);
    }

    public User getUserEntityByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private AuthResponse mapToResponse(User user) {
        return AuthResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }


}


