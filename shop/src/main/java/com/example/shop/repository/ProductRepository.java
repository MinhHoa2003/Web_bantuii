package com.example.shop.repository;

import com.example.shop.entity.Product;
import com.example.shop.repository.custom.ProductRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {
    void deleteByIdIn(List<Long> ids);

    List<Product> findAllByBrandId(Long aLong);
}
