package com.example.shop.service;

import com.example.shop.dto.BrandDTO;
import com.example.shop.dto.CategoryDTO;
import com.example.shop.entity.Category;

import java.util.List;

public interface ICategoryService {
    List<CategoryDTO> getCategories();

    Category createCategory(CategoryDTO categoryDTO);

    void deleteCategory(String name);
}
