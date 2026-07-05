package com.smarterp.report.dto.response;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseReportResponse {

    private Long totalPurchases;

    private Long totalItemsPurchased;

    private BigDecimal totalPurchaseAmount;

    private BigDecimal averagePurchaseValue;

}