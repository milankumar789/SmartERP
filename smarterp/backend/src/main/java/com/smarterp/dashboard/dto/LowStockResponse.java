package com.smarterp.dashboard.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LowStockResponse {

    private Long productId;

    private String productCode;

    private String productName;

    private Integer quantity;

    private Integer minimumStock;

    public LowStockResponse(
            Long productId,
            String productCode,
            String productName,
            Integer quantity,
            Integer minimumStock) {

        this.productId = productId;
        this.productCode = productCode;
        this.productName = productName;
        this.quantity = quantity;
        this.minimumStock = minimumStock;
    }

}