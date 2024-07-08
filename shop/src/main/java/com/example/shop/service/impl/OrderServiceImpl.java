package com.example.shop.service.impl;

import com.example.shop.dto.OrderDTO;
import com.example.shop.dto.OrderDetailDTO;
import com.example.shop.dto.OrderResponseDTO;
import com.example.shop.entity.*;
import com.example.shop.exception.DataNotFoundException;
import com.example.shop.repository.OrderDetailRepository;
import com.example.shop.repository.OrderRepository;
import com.example.shop.repository.ProductRepository;
import com.example.shop.repository.UserRepository;
import com.example.shop.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ModelMapper modelMapper;
    @Override
    public Order createOrder(OrderDTO orderDTO) throws Exception {
        //tìm xem user'id có tồn tại ko
        User user = userRepository
                .findByEmail(orderDTO.getEmail())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with email: "+orderDTO.getEmail()));
        //convert orderDTO => Order
        //dùng thư viện Model Mapper
        // Tạo một luồng bảng ánh xạ riêng để kiểm soát việc ánh xạ
        modelMapper.typeMap(OrderDTO.class, Order.class)
                .addMappings(mapper -> mapper.skip(Order::setId));
        // Cập nhật các trường của đơn hàng từ orderDTO
        Order order = new Order();
        modelMapper.map(orderDTO, order);
        order.setUser(user);
        order.setOrderDate(new Date());//lấy thời điểm hiện tại
        order.setStatus(OrderStatus.PENDING);
        Order saveOrder = orderRepository.save(order);
        List<OrderDetailDTO> orderDetails = orderDTO.getOrderDetails();
        for (OrderDetailDTO detail : orderDetails) {
            OrderDetail orderDetail = new OrderDetail();
            modelMapper.map(detail, orderDetail);
            orderDetail.setId(null);
            Product product = productRepository.findById(detail.getProductId())
                    .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: "+detail.getProductId()));
            orderDetail.setProduct(product);
            orderDetail.setOrder(saveOrder);
            orderDetailRepository.save(orderDetail);
        }
        return saveOrder;
    }

    @Override
    public Order getOrder(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public Order updateOrder(Long id, String status)
            throws DataNotFoundException {
        Order order = orderRepository.findById(id).orElseThrow(() ->
                new DataNotFoundException("Cannot find order with id: " + id));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find order with id: "+ id));
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(order.getId());
        for (OrderDetail item : orderDetails) {
            orderDetailRepository.deleteById(item.getId());
        }
        orderRepository.deleteById(id);
    }

    @Override
    public List<OrderResponseDTO> getAllOrder() {
        List<Order> orders = orderRepository.findAll();
        List<OrderResponseDTO> orderResponseDTOs = new ArrayList<>();
        for (Order item : orders) {
            OrderResponseDTO orderDTO = modelMapper.map(item, OrderResponseDTO.class);
            orderDTO.setUserId(item.getUser().getId());
            orderResponseDTOs.add(orderDTO);
        }
        Collections.sort(orderResponseDTOs, new Comparator<OrderResponseDTO>() {
            @Override
            public int compare(OrderResponseDTO o1, OrderResponseDTO o2) {
                return o1.getOrderDate().compareTo(o2.getOrderDate());
            }
        });
        return orderResponseDTOs;
    }

    @Override
    public List<OrderResponseDTO> findByUserId(String email) {
        List<Order> orders = orderRepository.findByEmail(email);
        List<OrderResponseDTO> orderResponseDTOs = new ArrayList<>();
        for (Order item : orders) {
            OrderResponseDTO orderDTO = modelMapper.map(item, OrderResponseDTO.class);
            orderDTO.setUserId(item.getUser().getId());
            orderResponseDTOs.add(orderDTO);
        }
        return orderResponseDTOs;
    }

}
