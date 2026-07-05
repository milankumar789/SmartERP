package com.smarterp.supplier.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SupplierResponse {

    private Long id;

    private String supplierCode;

    private String name;

    private String email;

    private String phone;

    private String address;

    private Boolean active;

    private LocalDateTime createdAt;

    public SupplierResponse(
            Long id,
            String supplierCode,
            String name,
            String email,
            String phone,
            String address,
            Boolean active,
            LocalDateTime createdAt) {

        this.id = id;
        this.supplierCode = supplierCode;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.active = active;
        this.createdAt = createdAt;
    }

}