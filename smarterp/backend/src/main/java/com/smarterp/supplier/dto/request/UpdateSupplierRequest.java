package com.smarterp.supplier.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateSupplierRequest {

    @NotBlank(message = "Supplier name is required.")
    @Size(max = 100, message = "Supplier name cannot exceed 100 characters.")
    private String name;

    @Email(message = "Please enter a valid email address.")
    @Size(max = 100, message = "Email cannot exceed 100 characters.")
    private String email;

    @NotBlank(message = "Phone number is required.")
    @Size(max = 20, message = "Phone number cannot exceed 20 characters.")
    private String phone;

    @Size(max = 500, message = "Address cannot exceed 500 characters.")
    private String address;

}