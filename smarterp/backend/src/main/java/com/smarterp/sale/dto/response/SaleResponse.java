package com.smarterp.sale.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SaleResponse {

    private Long id;

    private String saleCode;

    private LocalDate saleDate;

    private String customerName;

    private String productName;

    private Integer quantity;

    private BigDecimal sellingPrice;

    private BigDecimal totalAmount;

    private LocalDateTime createdAt;

    public SaleResponse(
            Long id,
            String saleCode,
            LocalDate saleDate,
            String customerName,
            String productName,
            Integer quantity,
            BigDecimal sellingPrice,
            BigDecimal totalAmount,
            LocalDateTime createdAt) {

        this.id = id;
        this.saleCode = saleCode;
        this.saleDate = saleDate;
        this.customerName = customerName;
        this.productName = productName;
        this.quantity = quantity;
        this.sellingPrice = sellingPrice;
        this.totalAmount = totalAmount;
        this.createdAt = createdAt;
    }

}