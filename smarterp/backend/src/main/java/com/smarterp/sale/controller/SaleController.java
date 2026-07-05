package com.smarterp.sale.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smarterp.sale.dto.request.CreateSaleRequest;
import com.smarterp.sale.dto.response.SaleResponse;
import com.smarterp.sale.service.SaleService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(
        name = "Sales",
        description = "Sales Management APIs"
)

@RestController
@RequestMapping("/api/v1/sales")
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping
    public SaleResponse createSale(
            @Valid @RequestBody CreateSaleRequest request) {

        return saleService.createSale(request);

    }

    @GetMapping
    public Page<SaleResponse> getAllSales(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size) {

        return saleService.getAllSales(page, size);

    }

}