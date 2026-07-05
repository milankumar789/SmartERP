package com.smarterp.customer.controller;

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

import com.smarterp.customer.dto.request.CreateCustomerRequest;
import com.smarterp.customer.dto.request.UpdateCustomerRequest;
import com.smarterp.customer.dto.response.CustomerResponse;
import com.smarterp.customer.service.CustomerService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;

@Tag(
        name = "Customers",
        description = "Customer Management APIs"
)
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public CustomerResponse createCustomer(
            @Valid @RequestBody CreateCustomerRequest request) {

        return customerService.createCustomer(request);

    }

    @GetMapping
    public Page<CustomerResponse> getAllCustomers(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size) {

        return customerService.getAllCustomers(page, size);

    }

    @GetMapping("/search")
    public Page<CustomerResponse> searchCustomers(

            @RequestParam String keyword,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size) {

        return customerService.searchCustomers(
                keyword,
                page,
                size
        );

    }

    @GetMapping("/{id}")
    public CustomerResponse getCustomerById(
            @PathVariable Long id) {

        return customerService.getCustomerById(id);

    }

    @PutMapping("/{id}")
    public CustomerResponse updateCustomer(

            @PathVariable Long id,

            @Valid @RequestBody UpdateCustomerRequest request) {

        return customerService.updateCustomer(id, request);

    }

    @PatchMapping("/{id}/deactivate")
    public String deactivateCustomer(
            @PathVariable Long id) {

        customerService.deactivateCustomer(id);

        return "Customer deactivated successfully.";

    }

    @GetMapping("/dropdown")
public List<CustomerResponse> getCustomerDropdown() {

    return customerService.getCustomerDropdown();

}

}