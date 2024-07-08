package com.example.shop.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.util.List;

@Data //toString
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {
    @NotEmpty(message = "first name cannot be empty")
    private String firstName;
    @NotEmpty(message = "last name cannot be empty")
    private String lastName;
    @NotEmpty(message = "email cannot be empty")
    private String email;
    @NotEmpty(message = "phone cannot be empty")
    private String phoneNumber;
    private String note;
    @Min(value=0, message = "total_money must be >= 0")
    private Float totalMoney;
    @NotEmpty(message = "address cannot be empty")
    @JsonProperty("address")
    private String shippingAddress;
    @NotEmpty(message = "payment method cannot be empty")
    private String paymentMethod;
    @NotEmpty(message = "products cannot be empty")
    @JsonProperty("orderDetails")
    private List<OrderDetailDTO> orderDetails;
}
