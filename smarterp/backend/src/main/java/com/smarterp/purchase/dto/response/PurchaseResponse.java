package com.smarterp.purchase.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PurchaseResponse {

    private Long id;

    private String purchaseCode;

    private LocalDate purchaseDate;

    private String productName;

    private String supplierName;

    private Integer quantity;

    private BigDecimal purchasePrice;

    private BigDecimal totalAmount;

    private LocalDateTime createdAt;

    public PurchaseResponse(
            Long id,
            String purchaseCode,
            LocalDate purchaseDate,
            String productName,
            String supplierName,
            Integer quantity,
            BigDecimal purchasePrice,
            BigDecimal totalAmount,
            LocalDateTime createdAt) {

        this.id = id;
        this.purchaseCode = purchaseCode;
        this.purchaseDate = purchaseDate;
        this.productName = productName;
        this.supplierName = supplierName;
        this.quantity = quantity;
        this.purchasePrice = purchasePrice;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt;
    }

}