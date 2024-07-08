package com.example.shop.converter;

import com.example.shop.dto.UserDTO;
import com.example.shop.dto.UserReponseDTO;
import com.example.shop.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {
    @Autowired
    private ModelMapper modelMapper;

    public UserReponseDTO convertToDto (User entity){
        UserReponseDTO result = modelMapper.map(entity, UserReponseDTO.class);
        return result;
    }

    public User convertToEntity (UserDTO dto){
        User result = modelMapper.map(dto, User.class);
        return result;
    }
}
