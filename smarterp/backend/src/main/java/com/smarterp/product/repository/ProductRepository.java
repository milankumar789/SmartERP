package com.smarterp.product.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.smarterp.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByProductCode(String productCode);

    boolean existsByProductCode(String productCode);

    boolean existsByNameIgnoreCase(String name);

    Page<Product> findByActiveTrue(Pageable pageable);

    List<Product> findByActiveTrue(Sort sort);

    Page<Product> findByActiveTrueAndNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );

    Optional<Product> findTopByOrderByIdDesc();

    @Query("""
            SELECT COALESCE(
                SUM(p.purchasePrice * p.quantity),
                0
            )
            FROM Product p
            WHERE p.active = true
            """)
    BigDecimal getInventoryValue();

    @Query("""
            SELECT COUNT(p)
            FROM Product p
            WHERE p.active = true
            AND p.quantity <= p.minimumStock
            """)
    long countLowStockProducts();

    @Query("""
            SELECT p
            FROM Product p
            WHERE p.active = true
            AND p.quantity <= p.minimumStock
            ORDER BY p.quantity ASC
            """)
    List<Product> findLowStockProducts();

    @Query("""
SELECT COUNT(p)
FROM Product p
WHERE p.active=true
""")
Long getTotalProducts();


@Query("""
SELECT COALESCE(SUM(p.quantity),0)
FROM Product p
WHERE p.active=true
""")
Long getTotalStock();

@Query("""
SELECT COUNT(p)
FROM Product p
WHERE p.active=true
AND p.quantity<=p.minimumStock
""")
Long getLowStockCount();

}