package com.example.shop.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data //toString
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {

    private Long key;
    @NotEmpty(message = "Category's name cannot be empty")
    private String value;
}
