package com.smarterp.purchase.repository;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.smarterp.purchase.entity.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    Optional<Purchase> findTopByOrderByIdDesc();

    @Override
    Page<Purchase> findAll(Pageable pageable);

    @Query("""
            SELECT COALESCE(SUM(p.totalAmount),0)
            FROM Purchase p
            """)
    BigDecimal getTotalPurchaseAmount();

    @Query("""
SELECT COUNT(p)
FROM Purchase p
""")
Long getTotalPurchases();


@Query("""
SELECT COALESCE(SUM(p.quantity),0)
FROM Purchase p
""")
Long getTotalItemsPurchased();

@Query("""
SELECT COALESCE(AVG(p.totalAmount),0)
FROM Purchase p
""")
BigDecimal getAveragePurchaseValue();



}