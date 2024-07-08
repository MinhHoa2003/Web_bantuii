package com.example.shop.dto;

import lombok.*;

import java.util.List;

@Data //toString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponseDTO {
    private Long id;
    private String name;
    private Float price;
    private String thumbnail;
    private String description;
    private List<CategoryDTO> categories;
    private List<BrandDTO> brands;
}
