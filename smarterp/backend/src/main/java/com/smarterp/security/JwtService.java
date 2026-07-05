package com.smarterp.security;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    private SecretKey getSigningKey() {

        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);

        return Keys.hmacShaKeyFor(keyBytes);

    }

    public String generateToken(String email) {

        return Jwts.builder()

                .subject(email)

                .issuedAt(new Date())

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + jwtExpiration
                        )
                )

                .signWith(getSigningKey())

                .compact();

    }

    public String extractUsername(String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );

    }

    public Date extractExpiration(String token) {

        return extractClaim(
                token,
                Claims::getExpiration
        );

    }

    public boolean isTokenValid(
            String token,
            String email
    ) {

        return email.equals(
                extractUsername(token)
        )

                &&

                extractExpiration(token)

                        .after(new Date());

    }

    private <T> T extractClaim(

            String token,

            Function<Claims, T> resolver

    ) {

        Claims claims =

                Jwts.parser()

                        .verifyWith(getSigningKey())

                        .build()

                        .parseSignedClaims(token)

                        .getPayload();

        return resolver.apply(claims);

    }

}