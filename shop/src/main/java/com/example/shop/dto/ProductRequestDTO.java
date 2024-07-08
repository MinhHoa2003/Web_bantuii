package com.example.shop.dto;

import lombok.*;

@Data //toString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRequestDTO {
    private String name;
    private String brandName;
    private String categoryName;
    private String orderByPrice;
}