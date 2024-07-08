package com.example.shop.service;


import com.example.shop.dto.PasswordDTO;
import com.example.shop.dto.UserDTO;
import com.example.shop.dto.UserReponseDTO;
import com.example.shop.entity.User;

import java.util.List;

public interface IUserService {
    User registerUser(UserDTO user);
    List<UserReponseDTO> getUsers();
    void deleteUser(String userName);
    UserReponseDTO getUser(String userName);

    User update(String email, UserDTO user);
    void updatePassword(String email, PasswordDTO passwordDTO);
}
