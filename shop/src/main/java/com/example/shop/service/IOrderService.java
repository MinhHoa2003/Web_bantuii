package com.example.shop.service;

import com.example.shop.dto.OrderDTO;
import com.example.shop.dto.OrderResponseDTO;
import com.example.shop.entity.Order;
import com.example.shop.exception.DataNotFoundException;

import java.util.List;

public interface IOrderService {
    Order createOrder(OrderDTO orderDTO) throws Exception;
    Order getOrder(Long id);
    Order updateOrder(Long id, String status) throws DataNotFoundException;
    void deleteOrder(Long id);

    List<OrderResponseDTO> getAllOrder();

    List<OrderResponseDTO> findByUserId(String email);
}
