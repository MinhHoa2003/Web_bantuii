package com.example.shop.repository.custom;

import com.example.shop.dto.ProductRequestDTO;
import com.example.shop.entity.Product;

import java.util.List;

public interface ProductRepositoryCustom {
    List<Product> findProducts(ProductRequestDTO productRequestDTO);
}
