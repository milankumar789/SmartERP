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
public class DashboardReportResponse {

    private Long totalCustomers;

    private Long totalSuppliers;

    private Long totalCategories;

    private Long totalProducts;

    private Long totalPurchases;

    private Long totalSales;

    private Long lowStockProducts;

    private BigDecimal inventoryValue;

    private BigDecimal purchaseAmount;

    private BigDecimal salesAmount;

    private BigDecimal estimatedProfit;

}