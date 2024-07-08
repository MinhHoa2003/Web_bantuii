package com.example.shop.service;

import com.example.shop.dto.ProductDTO;
import com.example.shop.dto.ProductRequestDTO;
import com.example.shop.dto.ProductResponseDTO;
import com.example.shop.entity.Product;
import com.example.shop.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IProductService {
    Product createProduct(ProductDTO productDTO, MultipartFile file) throws IOException;

    List<Product> getProducts();

    void deleleteProducts(List<Long> ids);

    Product getProduct(Long id);

    List<Product> getProductsByBrandId(Integer id);

    List<Product> findProducts(ProductRequestDTO productRequestDTO);
}
