package com.smarterp.purchase.service;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smarterp.common.exception.ResourceNotFoundException;
import com.smarterp.product.entity.Product;
import com.smarterp.product.repository.ProductRepository;
import com.smarterp.purchase.dto.request.CreatePurchaseRequest;
import com.smarterp.purchase.dto.response.PurchaseResponse;
import com.smarterp.purchase.entity.Purchase;
import com.smarterp.purchase.repository.PurchaseRepository;
import com.smarterp.supplier.entity.Supplier;
import com.smarterp.supplier.repository.SupplierRepository;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;

    public PurchaseService(
            PurchaseRepository purchaseRepository,
            ProductRepository productRepository,
            SupplierRepository supplierRepository) {

        this.purchaseRepository = purchaseRepository;
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
    }

    @Transactional
    public PurchaseResponse createPurchase(CreatePurchaseRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found."));

        Purchase purchase = new Purchase();

        purchase.setPurchaseCode(generatePurchaseCode());
        purchase.setPurchaseDate(request.getPurchaseDate());
        purchase.setQuantity(request.getQuantity());
        purchase.setPurchasePrice(request.getPurchasePrice());

        BigDecimal total = request.getPurchasePrice()
                .multiply(BigDecimal.valueOf(request.getQuantity()));

        purchase.setTotalAmount(total);

        purchase.setProduct(product);
        purchase.setSupplier(supplier);

        product.setQuantity(
                product.getQuantity() + request.getQuantity()
        );

        productRepository.save(product);

        Purchase savedPurchase = purchaseRepository.save(purchase);

        return mapToResponse(savedPurchase);
    }

    public Page<PurchaseResponse> getAllPurchases(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return purchaseRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    private PurchaseResponse mapToResponse(Purchase purchase) {

        return new PurchaseResponse(
                purchase.getId(),
                purchase.getPurchaseCode(),
                purchase.getPurchaseDate(),
                purchase.getProduct().getName(),
                purchase.getSupplier().getName(),
                purchase.getQuantity(),
                purchase.getPurchasePrice(),
                purchase.getTotalAmount(),
                purchase.getCreatedAt()
        );
    }

    private String generatePurchaseCode() {

        Optional<Purchase> lastPurchase =
                purchaseRepository.findTopByOrderByIdDesc();

        if (lastPurchase.isEmpty()) {
            return "PUR-00001";
        }

        long nextId = lastPurchase.get().getId() + 1;

        return String.format("PUR-%05d", nextId);
    }

}