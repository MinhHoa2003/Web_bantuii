package com.example.shop.controller;

import com.example.shop.dto.OrderDetailDTO;
import com.example.shop.dto.OrderDetailResponse;
import com.example.shop.entity.OrderDetail;
import com.example.shop.exception.DataNotFoundException;
import com.example.shop.service.IOrderDetailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/order_details")
@RequiredArgsConstructor
public class OrderDetailController {
    private final IOrderDetailService orderDetailService;
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderDetail(
            @Valid @PathVariable("id") Long id) throws DataNotFoundException {
        OrderDetail orderDetail = orderDetailService.getOrderDetail(id);
        return ResponseEntity.ok().body(OrderDetailResponse.fromOrderDetail(orderDetail));
        //return ResponseEntity.ok(orderDetail);
    }
    //lấy ra danh sách các order_details của 1 order nào đó
    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getOrderDetails(
            @Valid @PathVariable("orderId") Long orderId
    ) {
        List<OrderDetail> orderDetails = orderDetailService.findByOrderId(orderId);
        return ResponseEntity.ok(orderDetails);
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllOrderDetail() {
        List<OrderDetail> orderDetails = orderDetailService.getAllOrderDetail();
        return ResponseEntity.ok(orderDetails);
    }

}
