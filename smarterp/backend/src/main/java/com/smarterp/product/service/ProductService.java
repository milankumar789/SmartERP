package com.smarterp.product.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.smarterp.category.entity.Category;
import com.smarterp.category.repository.CategoryRepository;
import com.smarterp.common.exception.BadRequestException;
import com.smarterp.common.exception.ResourceNotFoundException;
import com.smarterp.product.dto.request.CreateProductRequest;
import com.smarterp.product.dto.request.UpdateProductRequest;
import com.smarterp.product.dto.response.ProductResponse;
import com.smarterp.product.entity.Product;
import com.smarterp.product.repository.ProductRepository;
import com.smarterp.supplier.entity.Supplier;
import com.smarterp.supplier.repository.SupplierRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final SupplierRepository supplierRepository;

    public ProductService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            SupplierRepository supplierRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
    }

    public ProductResponse createProduct(CreateProductRequest request) {

        if (productRepository.existsByNameIgnoreCase(request.getName())) {
            throw new BadRequestException("Product already exists.");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found."));

        Product product = new Product();

        product.setProductCode(generateProductCode());
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPurchasePrice(request.getPurchasePrice());
        product.setSellingPrice(request.getSellingPrice());
        product.setQuantity(request.getQuantity());
        product.setMinimumStock(request.getMinimumStock());
        product.setCategory(category);
        product.setSupplier(supplier);
        product.setActive(true);

        Product savedProduct = productRepository.save(product);

        return mapToResponse(savedProduct);
    }

    public Page<ProductResponse> getAllProducts(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return productRepository.findByActiveTrue(pageable)
                .map(this::mapToResponse);
    }

    public Page<ProductResponse> searchProducts(
            String keyword,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        return productRepository
                .findByActiveTrueAndNameContainingIgnoreCase(keyword, pageable)
                .map(this::mapToResponse);
    }

    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        return mapToResponse(product);
    }

    public ProductResponse updateProduct(
            Long id,
            UpdateProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        Supplier supplier = supplierRepository.findById(request.getSupplierId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found."));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPurchasePrice(request.getPurchasePrice());
        product.setSellingPrice(request.getSellingPrice());
        product.setQuantity(request.getQuantity());
        product.setMinimumStock(request.getMinimumStock());
        product.setCategory(category);
        product.setSupplier(supplier);

        Product updatedProduct = productRepository.save(product);

        return mapToResponse(updatedProduct);
    }

    public void deactivateProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found."));

        product.setActive(false);

        productRepository.save(product);
    }

    private ProductResponse mapToResponse(Product product) {

        return new ProductResponse(
                product.getId(),
                product.getProductCode(),
                product.getName(),
                product.getDescription(),
                product.getPurchasePrice(),
                product.getSellingPrice(),
                product.getQuantity(),
                product.getMinimumStock(),
                product.getActive(),
                product.getCategory().getName(),
                product.getSupplier().getName(),
                product.getCreatedAt()
        );
    }

    private String generateProductCode() {

        Optional<Product> lastProduct =
                productRepository.findTopByOrderByIdDesc();

        if (lastProduct.isEmpty()) {
            return "PROD-00001";
        }

        long nextId = lastProduct.get().getId() + 1;

        return String.format("PROD-%05d", nextId);
    }

    public List<ProductResponse> getProductDropdown() {

    return productRepository.findByActiveTrue(
            Sort.by("name")
    ).stream()
            .map(this::mapToResponse)
            .toList();

}

}