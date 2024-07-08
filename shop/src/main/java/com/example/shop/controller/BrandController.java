package com.example.shop.controller;

import com.example.shop.dto.BrandDTO;
import com.example.shop.dto.CategoryDTO;
import com.example.shop.entity.Brand;
import com.example.shop.entity.Category;
import com.example.shop.service.IBrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/brands")
@RequiredArgsConstructor
public class BrandController {
    private final IBrandService brandService;

    @GetMapping("/all")
    public ResponseEntity<?> getBrands() {
        try {
            List<BrandDTO> brandDTOs = brandService.getBrands();
            return ResponseEntity.ok(brandDTOs);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBrand(@PathVariable("id") Integer id) {
        try {
            BrandDTO brandDTO = brandService.getBrand(id);
            return ResponseEntity.ok(brandDTO);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_STAFF')")
    public ResponseEntity<?> createBrand(@Valid @RequestBody BrandDTO brandDTO, BindingResult result) {
        try{
            if(result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages.get(0));
            }
            Brand brand = brandService.createBrand(brandDTO);
            return ResponseEntity.ok(brand);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
    @DeleteMapping("/{name}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_STAFF')")
    public ResponseEntity<String> deleteBrand(@PathVariable("name") String name) {
        try{
            brandService.deleteBrand(name);
            return ResponseEntity.ok("Brand deleted successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }
}
