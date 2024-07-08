package com.example.shop.dto;

import lombok.*;

@Data //toString
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoleResponseDTO {

    private Long key;
    private String value;
}
