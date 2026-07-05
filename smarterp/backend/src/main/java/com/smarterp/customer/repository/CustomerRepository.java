package com.smarterp.customer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.smarterp.customer.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByCustomerCode(String customerCode);

    boolean existsByCustomerCode(String customerCode);

    Page<Customer> findByActiveTrue(Pageable pageable);

    List<Customer> findByActiveTrue(Sort sort);

    Page<Customer> findByActiveTrueAndNameContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );

    Optional<Customer> findTopByOrderByIdDesc();

    @Query("""
SELECT COUNT(c)
FROM Customer c
WHERE c.active=true
""")
Long getTotalCustomers();

@Query("""
SELECT c.id,
       COUNT(s.id),
       COALESCE(SUM(s.totalAmount),0)
FROM Customer c
LEFT JOIN Sale s
ON s.customer.id = c.id
GROUP BY c.id
""")
List<Object[]> getCustomerSalesSummary();

}