package com.example.shop.controller;

import com.example.shop.dto.BrandDTO;
import com.example.shop.dto.CategoryDTO;
import com.example.shop.entity.Category;
import com.example.shop.service.ICategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final ICategoryService categoryService;
    @GetMapping("/all")
    public ResponseEntity<?> getBrands() {
        try {
            List<CategoryDTO> categories = categoryService.getCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_STAFF')")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryDTO categoryDTO) {
        try{
            Category category = categoryService.createCategory(categoryDTO);
            return ResponseEntity.ok(category);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
    @DeleteMapping("/{name}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_STAFF')")
    public ResponseEntity<String> deleteCategory(@PathVariable("name") String name) {
        try{
            categoryService.deleteCategory(name);
            return ResponseEntity.ok("Category deleted successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
}
