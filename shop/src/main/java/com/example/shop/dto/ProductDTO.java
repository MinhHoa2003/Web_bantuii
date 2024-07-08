package com.example.shop.dto;


import lombok.*;
import org.springframework.web.multipart.MultipartFile;
@Data //toString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private Float price;
    private String thumbnail;
    private String description;
    private Long categoryId;
    private Integer brandId;
}
