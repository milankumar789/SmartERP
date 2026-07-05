package com.smarterp.supplier.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.smarterp.common.exception.ResourceNotFoundException;
import com.smarterp.supplier.dto.request.CreateSupplierRequest;
import com.smarterp.supplier.dto.request.UpdateSupplierRequest;
import com.smarterp.supplier.dto.response.SupplierResponse;
import com.smarterp.supplier.entity.Supplier;
import com.smarterp.supplier.repository.SupplierRepository;
import java.util.List;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public SupplierResponse createSupplier(CreateSupplierRequest request) {

        Supplier supplier = new Supplier();

        supplier.setSupplierCode(generateSupplierCode());
        supplier.setName(request.getName());
        supplier.setEmail(request.getEmail());
        supplier.setPhone(request.getPhone());
        supplier.setAddress(request.getAddress());
        supplier.setActive(true);

        Supplier savedSupplier = supplierRepository.save(supplier);

        return mapToResponse(savedSupplier);
    }

    public Page<SupplierResponse> getAllSuppliers(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return supplierRepository.findByActiveTrue(pageable)
                .map(this::mapToResponse);
    }

    public Page<SupplierResponse> searchSuppliers(
            String keyword,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        return supplierRepository
                .findByActiveTrueAndNameContainingIgnoreCase(keyword, pageable)
                .map(this::mapToResponse);
    }

    public SupplierResponse getSupplierById(Long id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found."));

        return mapToResponse(supplier);
    }

    public SupplierResponse updateSupplier(
            Long id,
            UpdateSupplierRequest request) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found."));

        supplier.setName(request.getName());
        supplier.setEmail(request.getEmail());
        supplier.setPhone(request.getPhone());
        supplier.setAddress(request.getAddress());

        Supplier updatedSupplier = supplierRepository.save(supplier);

        return mapToResponse(updatedSupplier);
    }

    public void deactivateSupplier(Long id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found."));

        supplier.setActive(false);

        supplierRepository.save(supplier);
    }

    private SupplierResponse mapToResponse(Supplier supplier) {

        return new SupplierResponse(
                supplier.getId(),
                supplier.getSupplierCode(),
                supplier.getName(),
                supplier.getEmail(),
                supplier.getPhone(),
                supplier.getAddress(),
                supplier.getActive(),
                supplier.getCreatedAt()
        );
    }

    private String generateSupplierCode() {

        Optional<Supplier> lastSupplier =
                supplierRepository.findTopByOrderByIdDesc();

        if (lastSupplier.isEmpty()) {
            return "SUP-00001";
        }

        long nextId = lastSupplier.get().getId() + 1;

        return String.format("SUP-%05d", nextId);
    }

    public List<SupplierResponse> getSupplierDropdown() {

    return supplierRepository.findByActiveTrue(
            org.springframework.data.domain.Sort.by("name")
    ).stream()
            .map(this::mapToResponse)
            .toList();

}

}