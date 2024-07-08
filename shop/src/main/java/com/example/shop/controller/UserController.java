package com.example.shop.controller;

import com.example.shop.dto.PasswordDTO;
import com.example.shop.dto.UserDTO;
import com.example.shop.dto.UserReponseDTO;
import com.example.shop.entity.User;
import com.example.shop.exception.DataNotFoundException;
import com.example.shop.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Simpson Alfred
 */

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUsers(){
        List<UserReponseDTO> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{email}")
    @PreAuthorize("#email.equals(principal.username) or hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email){
        try{
            UserReponseDTO theUser = userService.getUser(email);
            return ResponseEntity.ok(theUser);
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }
    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or (hasRole('ROLE_USER') and #email.equals(principal.username))")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") String email){
        try{
            userService.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully");
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
        }
    }
    @PutMapping("/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or #email.equals(principal.username)")
    public ResponseEntity<?> updateUsers(@PathVariable("email") String email, @RequestBody UserDTO user) {
        try{
            return ResponseEntity.ok(userService.update(email, user));
        }catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
    }

    @PutMapping("/change-password/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or #email.equals(principal.username)")
    public ResponseEntity<String> changePasswordUser(@PathVariable("email") String email, @RequestBody PasswordDTO passwordDTO) {
        try {
            userService.updatePassword(email, passwordDTO);
            return ResponseEntity.ok("Success");
        } catch (DataNotFoundException e) {
            //LOGGER.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
