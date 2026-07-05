package com.smarterp.report.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smarterp.category.repository.CategoryRepository;
import com.smarterp.customer.repository.CustomerRepository;
import com.smarterp.product.entity.Product;
import com.smarterp.product.repository.ProductRepository;
import com.smarterp.purchase.repository.PurchaseRepository;
import com.smarterp.report.dto.response.DashboardReportResponse;
import com.smarterp.report.dto.response.InventoryReportResponse;
import com.smarterp.report.dto.response.LowStockReportResponse;
import com.smarterp.report.dto.response.PurchaseReportResponse;
import com.smarterp.report.dto.response.SalesReportResponse;
import com.smarterp.sale.repository.SaleRepository;
import com.smarterp.supplier.repository.SupplierRepository;

@Service
public class ReportService {

    private final CustomerRepository customerRepository;

    private final SupplierRepository supplierRepository;

    private final CategoryRepository categoryRepository;

    private final ProductRepository productRepository;

    private final PurchaseRepository purchaseRepository;

    private final SaleRepository saleRepository;

    public ReportService(

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

    public DashboardReportResponse getDashboardReport() {

        BigDecimal purchaseAmount =
                purchaseRepository.getTotalPurchaseAmount();

        BigDecimal salesAmount =
                saleRepository.getTotalSalesAmount();

        BigDecimal inventoryValue =
                productRepository.getInventoryValue();

        BigDecimal estimatedProfit =
                salesAmount.subtract(purchaseAmount);

        return new DashboardReportResponse(

                customerRepository.getTotalCustomers(),

                supplierRepository.getTotalSuppliers(),

                categoryRepository.getTotalCategories(),

                productRepository.getTotalProducts(),

                purchaseRepository.getTotalPurchases(),

                saleRepository.getTotalSales(),

                productRepository.countLowStockProducts(),

                inventoryValue,

                purchaseAmount,

                salesAmount,

                estimatedProfit

        );

    }

    public SalesReportResponse getSalesReport() {

        return new SalesReportResponse(

                saleRepository.getTotalSales(),

                saleRepository.getTotalProductsSold(),

                saleRepository.getTotalSalesAmount(),

                saleRepository.getAverageSaleValue()

        );

    }

    public PurchaseReportResponse getPurchaseReport() {

        return new PurchaseReportResponse(

                purchaseRepository.getTotalPurchases(),

                purchaseRepository.getTotalItemsPurchased(),

                purchaseRepository.getTotalPurchaseAmount(),

                purchaseRepository.getAveragePurchaseValue()

        );

    }

    public InventoryReportResponse getInventoryReport() {

        return new InventoryReportResponse(

                productRepository.getTotalProducts(),

                productRepository.getTotalStock(),

                productRepository.getInventoryValue(),

                productRepository.countLowStockProducts()

        );

    }

    public List<LowStockReportResponse> getLowStockReport() {

        return productRepository.findLowStockProducts()

                .stream()

                .map(this::mapLowStock)

                .toList();

    }

    private LowStockReportResponse mapLowStock(Product product) {

        return new LowStockReportResponse(

                product.getId(),

                product.getProductCode(),

                product.getName(),

                product.getQuantity(),

                product.getMinimumStock()

        );

    }

}