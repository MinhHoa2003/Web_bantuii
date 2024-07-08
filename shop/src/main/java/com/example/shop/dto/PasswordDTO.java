package com.example.shop.dto;

import lombok.*;

@Data //toString
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordDTO {
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;
}
