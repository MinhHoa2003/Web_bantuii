package com.example.shop.service;

import com.example.shop.dto.BrandDTO;
import com.example.shop.entity.Brand;

import java.util.List;

public interface IBrandService {
    List<BrandDTO> getBrands();

    Brand createBrand(BrandDTO brandDTO);

    void deleteBrand(String name);

    BrandDTO getBrand(Integer id);
}
