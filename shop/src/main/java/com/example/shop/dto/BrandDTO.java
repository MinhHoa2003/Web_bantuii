package com.example.shop.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data //toString
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BrandDTO {
    private Integer key;
    @NotEmpty(message = "Brand's name cannot be empty")
    private String value;
}
