package com.example.shop.service.impl;

import com.example.shop.dto.ProductDTO;
import com.example.shop.dto.ProductRequestDTO;
import com.example.shop.dto.ProductResponseDTO;
import com.example.shop.entity.Brand;
import com.example.shop.entity.Category;
import com.example.shop.entity.Product;
import com.example.shop.exception.BrandAlreadyExistsException;
import com.example.shop.exception.CategoryAlreadyExistsException;
import com.example.shop.exception.ProductNotFoundException;
import com.example.shop.repository.BrandRepository;
import com.example.shop.repository.CategoryRepository;
import com.example.shop.repository.ProductRepository;
import com.example.shop.service.IProductService;
import com.example.shop.utils.UploadFileImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements IProductService {
    private final UploadFileImage uploadFileImage;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;

    @Override
    public Product createProduct(ProductDTO productDTO, MultipartFile file) throws IOException {
        Category existingCategory = categoryRepository
                .findById(productDTO.getCategoryId())
                .orElseThrow(() ->
                        new CategoryAlreadyExistsException(
                                "Cannot find category with id: "+productDTO.getCategoryId()));
        Brand existingBrand = brandRepository
                .findById(Long.valueOf(productDTO.getBrandId()))
                .orElseThrow(() ->
                        new BrandAlreadyExistsException(
                                "Cannot find brand with id: "+productDTO.getBrandId()));
        StringBuilder imageUrl = new StringBuilder("");
        if(productDTO.getId() != null) {
            Product product = productRepository.findById(productDTO.getId()).get();
            if (file == null) {
                imageUrl.append(product.getThumbnail());
            }
        }
        if(file != null) {
            imageUrl.append(uploadFileImage.uploadFile(file));
        }
        Product newProduct = Product.builder()
                .name(productDTO.getName())
                .price(productDTO.getPrice())
                .thumbnail(imageUrl.toString())
                .description(productDTO.getDescription())
                .category(existingCategory)
                .brand(existingBrand)
                .build();
        if(productDTO.getId() != null) {
            newProduct.setId(productDTO.getId());
        }
        return productRepository.save(newProduct);
    }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    @Transactional
    public void deleleteProducts(List<Long> ids) {
        productRepository.deleteByIdIn(ids);
    }

    @Override
    public Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Cannot find product with id: "+ id));
    }

    @Override
    @Transactional
    public List<Product> getProductsByBrandId(Integer id) {
        return productRepository.findAllByBrandId(Long.valueOf(id));
    }

    @Override
    public List<Product> findProducts(ProductRequestDTO productRequestDTO) {
        return productRepository.findProducts(productRequestDTO);
    }
}
