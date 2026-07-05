package com.smarterp.customer.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CustomerResponse {

    private Long id;

    private String customerCode;

    private String name;

    private String email;

    private String phone;

    private String address;

    private Boolean active;

    private LocalDateTime createdAt;

    public CustomerResponse(
            Long id,
            String customerCode,
            String name,
            String email,
            String phone,
            String address,
            Boolean active,
            LocalDateTime createdAt) {

        this.id = id;
        this.customerCode = customerCode;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.active = active;
        this.createdAt = createdAt;
    }

}