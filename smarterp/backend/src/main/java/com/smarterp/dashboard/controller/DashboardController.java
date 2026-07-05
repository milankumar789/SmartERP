package com.smarterp.dashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smarterp.dashboard.dto.DashboardResponse;
import com.smarterp.dashboard.dto.LowStockResponse;
import com.smarterp.dashboard.service.DashboardService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(
        name = "Dashboard",
        description = "Dashboard Analytics APIs"
)

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public DashboardResponse getSummary() {

        return dashboardService.getSummary();

    }

    @GetMapping("/low-stock")
    public List<LowStockResponse> getLowStockProducts() {

        return dashboardService.getLowStockProducts();

    }

}