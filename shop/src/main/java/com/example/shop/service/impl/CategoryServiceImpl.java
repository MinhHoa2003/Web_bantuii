package com.example.shop.service.impl;

import com.example.shop.dto.CategoryDTO;
import com.example.shop.entity.Brand;
import com.example.shop.entity.Category;
import com.example.shop.exception.CategoryAlreadyExistsException;
import com.example.shop.repository.CategoryRepository;
import com.example.shop.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements ICategoryService {
    private final CategoryRepository categoryRepository;
    @Override
    public List<CategoryDTO> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOs = new ArrayList<>();
        for(Category b : categories) {
            CategoryDTO result = new CategoryDTO();
            result.setKey(b.getId());
            result.setValue(b.getName());
            categoryDTOs.add(result);
        }
        return categoryDTOs;
    }

    @Override
    public Category createCategory(CategoryDTO categoryDTO) {
        if(categoryRepository.existsByName(categoryDTO.getValue())) {
            throw new RuntimeException("Category already exists");
        } else {
            Category category = Category.builder()
                    .name(categoryDTO.getValue())
                    .build();
            return categoryRepository.save(category);
        }
    }

    @Override
    public void deleteCategory(String name) {
        Category category = categoryRepository.findByName(name)
                .orElseThrow(() -> new CategoryAlreadyExistsException("Category not exists"));;
        if (category != null) {
            categoryRepository.deleteByName(name);
        }
    }
}
