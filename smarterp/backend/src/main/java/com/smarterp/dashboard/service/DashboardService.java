package com.smarterp.dashboard.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smarterp.category.repository.CategoryRepository;
import com.smarterp.customer.repository.CustomerRepository;
import com.smarterp.dashboard.dto.DashboardResponse;
import com.smarterp.dashboard.dto.LowStockResponse;
import com.smarterp.product.repository.ProductRepository;
import com.smarterp.purchase.repository.PurchaseRepository;
import com.smarterp.sale.repository.SaleRepository;
import com.smarterp.supplier.repository.SupplierRepository;

@Service
public class DashboardService {

    private final CustomerRepository customerRepository;

    private final SupplierRepository supplierRepository;

    private final CategoryRepository categoryRepository;

    private final ProductRepository productRepository;

    private final PurchaseRepository purchaseRepository;

    private final SaleRepository saleRepository;

    public DashboardService(
            CustomerRepository customerRepository,
            SupplierRepository supplierRepository,
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            PurchaseRepository purchaseRepository,
            SaleRepository saleRepository) {

        this.customerRepository = customerRepository;
        this.supplierRepository = supplierRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.purchaseRepository = purchaseRepository;
        this.saleRepository = saleRepository;
    }

    public DashboardResponse getSummary() {

        long totalCustomers = customerRepository.count();

        long totalSuppliers = supplierRepository.count();

        long totalCategories = categoryRepository.count();

        long totalProducts = productRepository.count();

        long totalPurchases = purchaseRepository.count();

        long totalSales = saleRepository.count();

        BigDecimal purchaseAmount = purchaseRepository.getTotalPurchaseAmount();

        BigDecimal salesAmount = saleRepository.getTotalSalesAmount();

        BigDecimal inventoryValue = productRepository.getInventoryValue();

        BigDecimal estimatedProfit = salesAmount.subtract(purchaseAmount);

        long lowStockProducts = productRepository.countLowStockProducts();

        return new DashboardResponse(
                totalCustomers,
                totalSuppliers,
                totalCategories,
                totalProducts,
                totalPurchases,
                totalSales,
                purchaseAmount,
                salesAmount,
                inventoryValue,
                estimatedProfit,
                lowStockProducts
        );

    }

    public List<LowStockResponse> getLowStockProducts() {

        return productRepository.findLowStockProducts()
                .stream()
                .map(product -> new LowStockResponse(
                        product.getId(),
                        product.getProductCode(),
                        product.getName(),
                        product.getQuantity(),
                        product.getMinimumStock()
                ))
                .toList();

    }

}