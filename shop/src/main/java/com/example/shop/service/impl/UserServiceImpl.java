package com.example.shop.service.impl;

import com.example.shop.converter.UserConverter;
import com.example.shop.dto.PasswordDTO;
import com.example.shop.dto.RoleResponseDTO;
import com.example.shop.dto.UserDTO;
import com.example.shop.dto.UserReponseDTO;
import com.example.shop.entity.Role;
import com.example.shop.entity.User;
import com.example.shop.exception.DataNotFoundException;
import com.example.shop.exception.RoleAlreadyExistException;
import com.example.shop.exception.UserAlreadyExistsException;
import com.example.shop.repository.RoleRepository;
import com.example.shop.repository.UserRepository;
import com.example.shop.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final UserConverter userConverter;
    @Override
    public User registerUser(UserDTO user) {
        User newUser = modelMapper.map(user, User.class);
        if (userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.getRoles() != null && !user.getRoles().isEmpty()) {
            List<Role> role = new ArrayList<>();
            for(String r : user.getRoles()) {
                Role tmp = roleRepository.findByName(r)
                        .orElseThrow(() -> new RoleAlreadyExistException("Role not found"));
                role.add(tmp);
            }
            newUser.setRoles(role);
        }
        else {
            Role userRole = roleRepository.findByName("ROLE_USER").get();
            newUser.setRoles(Collections.singletonList(userRole));
        }
        return userRepository.save(newUser);

    }

    @Override
    public List<UserReponseDTO> getUsers() {
        List<User> newsEntities = userRepository.findAll();
        List<UserReponseDTO> result = new ArrayList<>();
        for (User userEntity : newsEntities) {
            UserReponseDTO userDTO = userConverter.convertToDto(userEntity);
            List<RoleResponseDTO> roleDTOs = new ArrayList<>();
            for (Role item : userEntity.getRoles()) {
                RoleResponseDTO roleDTO = new RoleResponseDTO();
                roleDTO.setKey(item.getId());
                roleDTO.setValue(item.getName());
                roleDTOs.add(roleDTO);
            }
            userDTO.setRoles(roleDTOs);
            result.add(userDTO);
        }
        return result;
    }

    @Transactional
    @Override
    public void deleteUser(String userName) {
        User theUser = userRepository.findByEmail(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (theUser != null) {
            userRepository.deleteByEmail(userName);
        }
    }

    @Override
    public UserReponseDTO getUser(String userName) {
        User user = userRepository.findByEmail(userName)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        UserReponseDTO userDTO = userConverter.convertToDto(user);
        List<RoleResponseDTO> roleDTOs = new ArrayList<>();
        for (Role item : user.getRoles()) {
            RoleResponseDTO roleDTO = new RoleResponseDTO();
            roleDTO.setKey(item.getId());
            roleDTO.setValue(item.getName());
            roleDTOs.add(roleDTO);
        }
        userDTO.setRoles(roleDTOs);
        return userDTO;
    }

    @Override
    public User update(String email, UserDTO user) {
        User oldUser = userRepository.findByEmail(email).get();
        User userEntity = new User();
        if (oldUser != null) {
            userEntity.setId(oldUser.getId());
            userEntity.setEmail(oldUser.getEmail());
            userEntity.setFirstName(user.getFirstName());
            userEntity.setLastName(user.getLastName());
            userEntity.setPassword(oldUser.getPassword());
            if(user.getRoles() != null && !user.getRoles().isEmpty()) {
                List<Role> role = new ArrayList<>();
                for(String r : user.getRoles()) {
                    Role tmp = roleRepository.findByName(r)
                            .orElseThrow(() -> new RoleAlreadyExistException("Role not found"));
                    role.add(tmp);
                }
                userEntity.setRoles(role);
            } else {
                userEntity.setRoles(oldUser.getRoles());
            }
        }
        return userRepository.save(userEntity);
    }

    @Override
    @Transactional
    public void updatePassword(String email, PasswordDTO passwordDTO) throws DataNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));;
        if (passwordEncoder.matches(passwordDTO.getOldPassword(), user.getPassword())
                && passwordDTO.getNewPassword().equals(passwordDTO.getConfirmPassword())) {
            user.setPassword(passwordEncoder.encode(passwordDTO.getNewPassword()));
            userRepository.save(user);
        } else {
            throw new DataNotFoundException("Failed");
        }
    }
}
