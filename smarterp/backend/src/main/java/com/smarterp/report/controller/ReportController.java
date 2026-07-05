package com.smarterp.report.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smarterp.report.dto.response.DashboardReportResponse;
import com.smarterp.report.dto.response.InventoryReportResponse;
import com.smarterp.report.dto.response.LowStockReportResponse;
import com.smarterp.report.dto.response.PurchaseReportResponse;
import com.smarterp.report.dto.response.SalesReportResponse;
import com.smarterp.report.service.ReportService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(
        name = "Reports",
        description = "ERP Reports APIs"
)
@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(
            ReportService reportService) {

        this.reportService = reportService;
    }

    @GetMapping("/dashboard")
    public DashboardReportResponse dashboard() {

        return reportService.getDashboardReport();
    }

    @GetMapping("/sales")
    public SalesReportResponse sales() {

        return reportService.getSalesReport();
    }

    @GetMapping("/purchases")
    public PurchaseReportResponse purchases() {

        return reportService.getPurchaseReport();
    }

    @GetMapping("/inventory")
    public InventoryReportResponse inventory() {

        return reportService.getInventoryReport();
    }

    @GetMapping("/low-stock")
    public List<LowStockReportResponse> lowStock() {

        return reportService.getLowStockReport();
    }

}