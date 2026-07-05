package com.smarterp.sale.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateSaleRequest {

    @NotNull(message = "Sale date is required.")
    private LocalDate saleDate;

    @NotNull(message = "Quantity is required.")
    @Min(value = 1, message = "Quantity must be at least 1.")
    private Integer quantity;

    @NotNull(message = "Product Id is required.")
    private Long productId;

    @NotNull(message = "Customer Id is required.")
    private Long customerId;

}