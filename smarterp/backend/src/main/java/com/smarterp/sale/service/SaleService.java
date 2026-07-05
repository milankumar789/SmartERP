package com.smarterp.sale.service;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smarterp.common.exception.BadRequestException;
import com.smarterp.common.exception.ResourceNotFoundException;
import com.smarterp.customer.entity.Customer;
import com.smarterp.customer.repository.CustomerRepository;
import com.smarterp.product.entity.Product;
import com.smarterp.product.repository.ProductRepository;
import com.smarterp.sale.dto.request.CreateSaleRequest;
import com.smarterp.sale.dto.response.SaleResponse;
import com.smarterp.sale.entity.Sale;
import com.smarterp.sale.repository.SaleRepository;

@Service
public class SaleService {

    private final SaleRepository saleRepository;

    private final ProductRepository productRepository;

    private final CustomerRepository customerRepository;

    public SaleService(
            SaleRepository saleRepository,
            ProductRepository productRepository,
            CustomerRepository customerRepository) {

        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional
    public SaleResponse createSale(CreateSaleRequest request) {

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found."));

        if (product.getQuantity() < request.getQuantity()) {
            throw new BadRequestException("Insufficient stock available.");
        }

        Sale sale = new Sale();

        sale.setSaleCode(generateSaleCode());
        sale.setSaleDate(request.getSaleDate());
        sale.setQuantity(request.getQuantity());

        // Always use the current product selling price
        sale.setSellingPrice(product.getSellingPrice());

        BigDecimal total = product.getSellingPrice()
                .multiply(BigDecimal.valueOf(request.getQuantity()));

        sale.setTotalAmount(total);

        sale.setProduct(product);
        sale.setCustomer(customer);

        // Reduce stock automatically
        product.setQuantity(
                product.getQuantity() - request.getQuantity()
        );

        productRepository.save(product);

        Sale savedSale = saleRepository.save(sale);

        return mapToResponse(savedSale);
    }

    public Page<SaleResponse> getAllSales(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return saleRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    private SaleResponse mapToResponse(Sale sale) {

        return new SaleResponse(
                sale.getId(),
                sale.getSaleCode(),
                sale.getSaleDate(),
                sale.getCustomer().getName(),
                sale.getProduct().getName(),
                sale.getQuantity(),
                sale.getSellingPrice(),
                sale.getTotalAmount(),
                sale.getCreatedAt()
        );
    }

    private String generateSaleCode() {

        Optional<Sale> lastSale =
                saleRepository.findTopByOrderByIdDesc();

        if (lastSale.isEmpty()) {
            return "SAL-00001";
        }

        long nextId = lastSale.get().getId() + 1;

        return String.format("SAL-%05d", nextId);
    }

}