package com.example.shop.repository;

import com.example.shop.entity.Brand;
import com.example.shop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    void deleteByName(String name);

    Optional<Brand> findByName(String name);

    boolean existsByName(String value);
}
