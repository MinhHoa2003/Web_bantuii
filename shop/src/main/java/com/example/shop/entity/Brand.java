package com.example.shop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "brand")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;
}
