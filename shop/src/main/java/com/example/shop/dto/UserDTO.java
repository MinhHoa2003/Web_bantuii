package com.example.shop.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data //toString
@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private List<String> roles = new ArrayList<>();
}
