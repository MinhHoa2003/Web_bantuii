package com.example.shop.dto;

import lombok.*;

import java.util.Date;

@Data //toString
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ContactResponseDTO {
    private Long id;
    private String fullName;
    private String phone;
    private String message;
    private Date date;
    private String status;
}
