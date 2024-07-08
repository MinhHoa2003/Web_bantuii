package com.example.shop.service.impl;

import com.example.shop.dto.RoleResponseDTO;
import com.example.shop.entity.Role;
import com.example.shop.entity.User;
import com.example.shop.exception.RoleAlreadyExistException;
import com.example.shop.repository.RoleRepository;
import com.example.shop.repository.UserRepository;
import com.example.shop.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RoleServiceImpl implements IRoleService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    @Override
    public List<RoleResponseDTO> getRoles() {
        List<Role> roles = roleRepository.findAll();;
        List<RoleResponseDTO> res = new ArrayList<>();
        for (Role r : roles) {
            RoleResponseDTO role = new RoleResponseDTO();
            role.setKey(r.getId());
            role.setValue(r.getName());
            res.add(role);
        }
        return res;
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName = "ROLE_" + theRole.getName().toUpperCase();
        Role role = new Role(roleName);
        if(roleRepository.existsByName(roleName)) {
            throw  new RoleAlreadyExistException(theRole.getName()+" role already exists");
        }
        return roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long roleId) {
        this.removeAllUsersFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (role.isPresent() && role.get().getUsers().contains(user.get())) {
            role.get().removeUserFromRole(user.get());
            roleRepository.save(role.get());
            return user.get();
        }
        throw new UsernameNotFoundException("User not found");
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role> role = roleRepository.findById(roleId);
        if (user.isPresent() && user.get().getRoles().contains(role.get())) {
            throw new RoleAlreadyExistException(user.get().getEmail() + " is already assigned to the " + role.get().getName());
        }
        if (role.isPresent()) {
            role.get().assignRoleToUser(user.get());
            roleRepository.save(role.get());
        }
        return user.get();
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Optional<Role> role = roleRepository.findById(roleId);
        role.ifPresent(Role::removeAllUsersFromRole);
        return roleRepository.save(role.get());
    }
}
