package com.example.shop.service;

import com.example.shop.dto.RoleResponseDTO;
import com.example.shop.entity.Role;
import com.example.shop.entity.User;

import java.util.List;

public interface IRoleService {
    List<RoleResponseDTO> getRoles();
    Role createRole(Role theRole);
    void deleteRole(Long id);
    Role findByName(String name);
    User removeUserFromRole(Long userId, Long roleId);
    User assignRoleToUser(Long userId, Long roleId);
    Role removeAllUsersFromRole(Long roleId);
}
