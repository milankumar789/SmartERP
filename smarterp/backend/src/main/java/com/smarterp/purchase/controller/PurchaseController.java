package com.smarterp.purchase.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smarterp.purchase.dto.request.CreatePurchaseRequest;
import com.smarterp.purchase.dto.response.PurchaseResponse;
import com.smarterp.purchase.service.PurchaseService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(
        name = "Purchases",
        description = "Purchase Management APIs"
)

@RestController
@RequestMapping("/api/v1/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping
    public PurchaseResponse createPurchase(
            @Valid @RequestBody CreatePurchaseRequest request) {

        return purchaseService.createPurchase(request);
    }

    @GetMapping
    public Page<PurchaseResponse> getAllPurchases(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size) {

        return purchaseService.getAllPurchases(page, size);
    }

}