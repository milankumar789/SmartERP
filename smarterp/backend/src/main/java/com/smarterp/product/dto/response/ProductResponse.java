package com.smarterp.product.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductResponse {

    private Long id;

    private String productCode;

    private String name;

    private String description;

    private BigDecimal purchasePrice;

    private BigDecimal sellingPrice;

    private Integer quantity;

    private Integer minimumStock;

    private Boolean active;

    private String categoryName;

    private String supplierName;

    private LocalDateTime createdAt;

    public ProductResponse(
            Long id,
            String productCode,
            String name,
            String description,
            BigDecimal purchasePrice,
            BigDecimal sellingPrice,
            Integer quantity,
            Integer minimumStock,
            Boolean active,
            String categoryName,
            String supplierName,
            LocalDateTime createdAt) {

        this.id = id;
        this.productCode = productCode;
        this.name = name;
        this.description = description;
        this.purchasePrice = purchasePrice;
        this.sellingPrice = sellingPrice;
        this.quantity = quantity;
        this.minimumStock = minimumStock;
        this.active = active;
        this.categoryName = categoryName;
        this.supplierName = supplierName;
        this.createdAt = createdAt;
    }

}