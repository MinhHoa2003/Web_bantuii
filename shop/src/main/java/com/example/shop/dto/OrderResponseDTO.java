package com.example.shop.dto;

import com.example.shop.entity.OrderDetail;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data //toString
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDTO {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String note;
    private Float totalMoney;
    private String shippingAddress;
    private String status;
    private Date orderDate;
    private String paymentMethod;
}
