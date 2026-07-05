package com.smarterp.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LowStockReportResponse {

    private Long productId;

    private String productCode;

    private String productName;

    private Integer quantity;

    private Integer minimumStock;

}