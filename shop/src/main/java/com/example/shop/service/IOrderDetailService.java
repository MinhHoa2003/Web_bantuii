package com.example.shop.service;

import com.example.shop.dto.OrderDetailDTO;
import com.example.shop.entity.OrderDetail;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail getOrderDetail(Long id);
    List<OrderDetail> findByOrderId(Long orderId);

    List<OrderDetail> getAllOrderDetail();
}
