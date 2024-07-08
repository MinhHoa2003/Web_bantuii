package com.example.shop.repository.custom.impl;

import com.example.shop.dto.ProductRequestDTO;
import com.example.shop.entity.Product;
import com.example.shop.repository.custom.ProductRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
@Primary
public class ProductRepositoryImpl implements ProductRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public List<Product> findProducts(ProductRequestDTO productRequestDTO) {
        StringBuilder sql = new StringBuilder("SELECT p.* FROM product p ");
        StringBuilder where = new StringBuilder("WHERE 1=1 ");
        if(productRequestDTO.getName() != null) {
            where.append("AND p.name LIKE '%" + productRequestDTO.getName() + "%' ");
        }
        if(productRequestDTO.getBrandName() != null && !productRequestDTO.getBrandName().equals("")) {
            sql.append("INNER JOIN brand b ON b.id = p.brand_id ");
            where.append("AND b.name = '" + productRequestDTO.getBrandName() + "' ");
        }
        if(productRequestDTO.getCategoryName() != null && !productRequestDTO.getCategoryName().equals("")) {
            sql.append("INNER JOIN category c ON c.id = p.category_id ");
            where.append("AND c.name = '" + productRequestDTO.getCategoryName() + "' ");
        }
        where.append("GROUP BY p.id ");
        sql.append(where);
        String sort = productRequestDTO.getOrderByPrice();
        if(sort != null && !sort.equals("")) {
            if(sort.equals("Thấp đến cao")) {
                sql.append("ORDER BY price ASC ");
            } else if(sort.equals("Cao đến thấp")) {
                sql.append("ORDER BY price DESC ");
            }
        }
        Query query = entityManager.createNativeQuery(sql.toString(), Product.class);
        return query.getResultList();
    }
}