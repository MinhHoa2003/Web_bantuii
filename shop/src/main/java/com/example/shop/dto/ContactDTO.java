package com.example.shop.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data //toString
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ContactDTO {
    @NotEmpty(message = "fullname cannot be empty")
    private String fullName;
    @NotEmpty(message = "phone cannot be empty")
    private String phone;
    @NotEmpty(message = "message cannot be empty")
    private String message;
}
