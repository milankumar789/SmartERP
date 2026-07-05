package com.smarterp.supplier.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.smarterp.supplier.entity.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    Optional<Supplier> findBySupplierCode(String supplierCode);

    boolean existsBySupplierCode(String supplierCode);

    Page<Supplier> findByActiveTrue(Pageable pageable);
    List<Supplier> findByActiveTrue(Sort sort);


    Page<Supplier> findByActiveTrueAndNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );
    
    @Query("""
SELECT COUNT(s)
FROM Supplier s
WHERE s.active=true
""")
Long getTotalSuppliers();

    Optional<Supplier> findTopByOrderByIdDesc();
@Query("""
SELECT s.id,
       COUNT(p.id),
       COALESCE(SUM(p.totalAmount),0)
FROM Supplier s
LEFT JOIN Purchase p
ON p.supplier.id = s.id
GROUP BY s.id
""")
List<Object[]> getSupplierPurchaseSummary();

}