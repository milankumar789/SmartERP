package com.smarterp.sale.repository;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.smarterp.sale.entity.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    Optional<Sale> findTopByOrderByIdDesc();

    @Override
    Page<Sale> findAll(Pageable pageable);

    @Query("""
            SELECT COALESCE(SUM(s.totalAmount),0)
            FROM Sale s
            """)
    BigDecimal getTotalSalesAmount();

    @Query("""
SELECT COUNT(s)
FROM Sale s
""")
Long getTotalSales();


@Query("""
SELECT COALESCE(SUM(s.quantity),0)
FROM Sale s
""")
Long getTotalProductsSold();

@Query("""
SELECT COALESCE(AVG(s.totalAmount),0)
FROM Sale s
""")
BigDecimal getAverageSaleValue();



}