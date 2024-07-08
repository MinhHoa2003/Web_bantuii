package com.example.shop.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDetailDTO {

    @Min(value=1, message = "Product's ID must be > 0")
    private Long productId;

    @Min(value=1, message = "number_of_products must be >= 1")
    private int numberOfProducts;

    @Min(value=0, message = "total_money must be >= 0")
    private Float totalMoney;
}
