package com.smarterp.purchase.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreatePurchaseRequest {

    @NotNull(message = "Purchase date is required.")
    private LocalDate purchaseDate;

    @NotNull(message = "Quantity is required.")
    @Min(value = 1, message = "Quantity must be at least 1.")
    private Integer quantity;

    @NotNull(message = "Purchase price is required.")
    @DecimalMin(value = "0.01", message = "Purchase price must be greater than zero.")
    private BigDecimal purchasePrice;

    @NotNull(message = "Product Id is required.")
    private Long productId;

    @NotNull(message = "Supplier Id is required.")
    private Long supplierId;

}