package com.example.shop.controller;

import com.example.shop.dto.ProductDTO;
import com.example.shop.dto.ProductRequestDTO;
import com.example.shop.entity.Product;
import com.example.shop.entity.User;
import com.example.shop.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
//@RequestMapping("/api/products")

@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;
    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_STAFF')")
    public ResponseEntity<?> createProduct(
            @RequestParam("name") String name,
            @RequestParam("price") Float price,
            @RequestParam("description") String description,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("brandId") Integer brandId,
            @RequestParam("file") MultipartFile file)
    {
        try{
            ProductDTO productDTO = ProductDTO.builder()
                    .name(name)
                    .price(price)
                    .description(description)
                    .categoryId(categoryId)
                    .brandId(brandId)
                    .build();
            Product newProduct = productService.createProduct(productDTO, file);
            return ResponseEntity.ok(newProduct);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
    @GetMapping("")
    public ResponseEntity<?> getProducts() {
        try{
            return ResponseEntity.ok(productService.getProducts());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
    @GetMapping("/brand/{id}")
    public ResponseEntity<?> getProductsByBrandId(@PathVariable("id") Integer id) {
        try{
            return ResponseEntity.ok(productService.getProductsByBrandId(id));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable("id") Long id) {
        try{
            return ResponseEntity.ok(productService.getProduct(id));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
    @DeleteMapping("/{ids}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_STAFF')")
    public ResponseEntity<String> deleteProducts(@PathVariable List<Long> ids) {
        try{
            productService.deleleteProducts(ids);
            return ResponseEntity.ok("Products deleted successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_STAFF')")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id,
                                              @RequestParam("name") String name,
                                              @RequestParam("price") Float price,
                                              @RequestParam("description") String description,
                                              @RequestParam("categoryId") Long categoryId,
                                              @RequestParam("brandId") Integer brandId,
                                              @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        ProductDTO productDTO = ProductDTO.builder()
                .id(id)
                .name(name)
                .price(price)
                .description(description)
                .categoryId(categoryId)
                .brandId(brandId)
                .build();
        return ResponseEntity.ok(productService.createProduct(productDTO, file));
    }
    @GetMapping("/search")
    public ResponseEntity<?> findProducts(@RequestParam Map<String, String> search) {
        try{
            ProductRequestDTO productRequestDTO = ProductRequestDTO.builder()
                    .name(search.get("name"))
                    .brandName(search.get("brandName"))
                    .categoryName(search.get("categoryName"))
                    .orderByPrice(search.get("orderByPrice"))
                    .build();
            List<Product> products = productService.findProducts(productRequestDTO);
            return ResponseEntity.ok(products);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
}
