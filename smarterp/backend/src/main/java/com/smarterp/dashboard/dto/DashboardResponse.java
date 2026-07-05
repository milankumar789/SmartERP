package com.smarterp.dashboard.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DashboardResponse {

    private long totalCustomers;

    private long totalSuppliers;

    private long totalCategories;

    private long totalProducts;

    private long totalPurchases;

    private long totalSales;

    private BigDecimal purchaseAmount;

    private BigDecimal salesAmount;

    private BigDecimal inventoryValue;

    private BigDecimal estimatedProfit;

    private long lowStockProducts;

    public DashboardResponse(
            long totalCustomers,
            long totalSuppliers,
            long totalCategories,
            long totalProducts,
            long totalPurchases,
            long totalSales,
            BigDecimal purchaseAmount,
            BigDecimal salesAmount,
            BigDecimal inventoryValue,
            BigDecimal estimatedProfit,
            long lowStockProducts) {

        this.totalCustomers = totalCustomers;
        this.totalSuppliers = totalSuppliers;
        this.totalCategories = totalCategories;
        this.totalProducts = totalProducts;
        this.totalPurchases = totalPurchases;
        this.totalSales = totalSales;
        this.purchaseAmount = purchaseAmount;
        this.salesAmount = salesAmount;
        this.inventoryValue = inventoryValue;
        this.estimatedProfit = estimatedProfit;
        this.lowStockProducts = lowStockProducts;
    }

}