package com.smarterp.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smarterp.auth.dto.request.LoginRequest;
import com.smarterp.auth.dto.request.RegisterRequest;
import com.smarterp.auth.dto.response.LoginResponse;
import com.smarterp.auth.dto.response.RegisterResponse;
import com.smarterp.auth.dto.response.UserInfoResponse;
import com.smarterp.auth.entity.Role;
import com.smarterp.auth.entity.User;
import com.smarterp.auth.repository.UserRepository;
import com.smarterp.common.exception.EmailAlreadyExistsException;
import com.smarterp.common.exception.InvalidCredentialsException;
import com.smarterp.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;

    }

    public RegisterResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new EmailAlreadyExistsException(
                    "Email already exists.");

        }

        User user = new User();

        user.setFullName(request.getFullName());

        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword()));

        user.setRole(Role.ADMIN);

        userRepository.save(user);

        return new RegisterResponse(
                "User registered successfully",
                user.getFullName(),
                user.getEmail()
        );

    }

    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException(
                                "Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new InvalidCredentialsException(
                    "Invalid email or password");

        }

        String token = jwtService.generateToken(
                user.getEmail());

        UserInfoResponse userInfo = new UserInfoResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name()
        );

        return new LoginResponse(
                "Login successful",
                token,
                "Bearer",
                jwtExpiration,
                userInfo
        );

    }

}