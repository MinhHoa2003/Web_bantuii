package com.example.shop.service.impl;

import com.example.shop.dto.BrandDTO;
import com.example.shop.entity.Brand;
import com.example.shop.entity.User;
import com.example.shop.exception.BrandAlreadyExistsException;
import com.example.shop.repository.BrandRepository;
import com.example.shop.service.IBrandService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BrandServiceImpl implements IBrandService {

    private final BrandRepository brandRepository;
    private final ModelMapper modelMapper;
    @Override
    public List<BrandDTO> getBrands() {
        List<Brand> brands = brandRepository.findAll();
        List<BrandDTO> brandDTOs = new ArrayList<>();
        for(Brand b : brands) {
            BrandDTO result = new BrandDTO();
            result.setKey(b.getId());
            result.setValue(b.getName());
            brandDTOs.add(result);
        }
        return brandDTOs;
    }

    @Override
    public Brand createBrand(BrandDTO brandDTO) {
        if(brandRepository.existsByName(brandDTO.getValue())) {
            throw new RuntimeException("Brand already exists");
        } else {
            Brand brand = Brand.builder()
                    .name(brandDTO.getValue())
                    .build();
            return brandRepository.save(brand);
        }
    }

    @Override
    public void deleteBrand(String name) {
        Brand brand = brandRepository.findByName(name)
                .orElseThrow(() -> new BrandAlreadyExistsException("Brand not exists"));;
        if (brand != null) {
            brandRepository.deleteByName(name);
        }
    }

    @Override
    public BrandDTO getBrand(Integer id) {
        Brand brand = brandRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new BrandAlreadyExistsException("Brand not exists"));
        BrandDTO brandDTO = new BrandDTO(brand.getId(), brand.getName());
        return brandDTO;
    }
}
