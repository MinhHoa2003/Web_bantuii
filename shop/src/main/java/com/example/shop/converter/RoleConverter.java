package com.example.shop.converter;

import com.example.shop.dto.RoleResponseDTO;
import com.example.shop.entity.Role;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleConverter {
    @Autowired
    private ModelMapper modelMapper;

    public RoleResponseDTO convertToDto(Role entity) {
        RoleResponseDTO result = modelMapper.map(entity, RoleResponseDTO.class);
        return result;
    }

    public Role convertToEntity(RoleResponseDTO dto) {
        Role result = modelMapper.map(dto, Role.class);
        return result;
    }
}
