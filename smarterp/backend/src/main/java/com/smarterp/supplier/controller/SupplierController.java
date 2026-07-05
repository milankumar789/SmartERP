package com.smarterp.supplier.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smarterp.supplier.dto.request.CreateSupplierRequest;
import com.smarterp.supplier.dto.request.UpdateSupplierRequest;
import com.smarterp.supplier.dto.response.SupplierResponse;
import com.smarterp.supplier.service.SupplierService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;

@Tag(
        name = "Suppliers",
        description = "Supplier Management APIs"
)

@RestController
@RequestMapping("/api/v1/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @PostMapping
    public SupplierResponse createSupplier(
            @Valid @RequestBody CreateSupplierRequest request) {

        return supplierService.createSupplier(request);
    }

    @GetMapping
    public Page<SupplierResponse> getAllSuppliers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return supplierService.getAllSuppliers(page, size);
    }

    @GetMapping("/search")
    public Page<SupplierResponse> searchSuppliers(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return supplierService.searchSuppliers(keyword, page, size);
    }

    @GetMapping("/{id}")
    public SupplierResponse getSupplierById(
            @PathVariable Long id) {

        return supplierService.getSupplierById(id);
    }

    @PutMapping("/{id}")
    public SupplierResponse updateSupplier(
            @PathVariable Long id,
            @Valid @RequestBody UpdateSupplierRequest request) {

        return supplierService.updateSupplier(id, request);
    }

    @PatchMapping("/{id}/deactivate")
    public String deactivateSupplier(
            @PathVariable Long id) {

        supplierService.deactivateSupplier(id);

        return "Supplier deactivated successfully.";
    }

    @GetMapping("/dropdown")
public List<SupplierResponse> getSupplierDropdown() {

    return supplierService.getSupplierDropdown();

}

}