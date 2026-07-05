package com.smarterp.customer.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.smarterp.common.exception.ResourceNotFoundException;
import com.smarterp.customer.dto.request.CreateCustomerRequest;
import com.smarterp.customer.dto.request.UpdateCustomerRequest;
import com.smarterp.customer.dto.response.CustomerResponse;
import com.smarterp.customer.entity.Customer;
import com.smarterp.customer.repository.CustomerRepository;
import java.util.List;
import org.springframework.data.domain.Sort;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public CustomerResponse createCustomer(CreateCustomerRequest request) {

        Customer customer = new Customer();

        customer.setCustomerCode(generateCustomerCode());
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setActive(true);

        Customer savedCustomer = customerRepository.save(customer);

        return mapToResponse(savedCustomer);
    }

    public Page<CustomerResponse> getAllCustomers(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return customerRepository.findByActiveTrue(pageable)
                .map(this::mapToResponse);
    }

    public Page<CustomerResponse> searchCustomers(
            String keyword,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        return customerRepository
                .findByActiveTrueAndNameContainingIgnoreCase(keyword, pageable)
                .map(this::mapToResponse);
    }

    public CustomerResponse getCustomerById(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found."));

        return mapToResponse(customer);
    }

    public CustomerResponse updateCustomer(
            Long id,
            UpdateCustomerRequest request) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found."));

        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());

        Customer updatedCustomer = customerRepository.save(customer);

        return mapToResponse(updatedCustomer);
    }

    public void deactivateCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found."));

        customer.setActive(false);

        customerRepository.save(customer);
    }

    private CustomerResponse mapToResponse(Customer customer) {

        return new CustomerResponse(
                customer.getId(),
                customer.getCustomerCode(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getAddress(),
                customer.getActive(),
                customer.getCreatedAt()
        );
    }

    private String generateCustomerCode() {

        Optional<Customer> lastCustomer =
                customerRepository.findTopByOrderByIdDesc();

        if (lastCustomer.isEmpty()) {
            return "CUS-00001";
        }

        long nextId = lastCustomer.get().getId() + 1;

        return String.format("CUS-%05d", nextId);
    }

    public List<CustomerResponse> getCustomerDropdown() {

    return customerRepository.findByActiveTrue(
            Sort.by("name")
    ).stream()
            .map(this::mapToResponse)
            .toList();

}

}