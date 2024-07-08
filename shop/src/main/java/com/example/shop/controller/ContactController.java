package com.example.shop.controller;

import com.example.shop.dto.ContactDTO;
import com.example.shop.dto.ContactResponseDTO;
import com.example.shop.entity.Contact;
import com.example.shop.service.IContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contacts")
@RequiredArgsConstructor
public class ContactController {
    private final IContactService contactService;

    @PostMapping("")
    public ResponseEntity<?> createContact(@Valid @RequestBody ContactDTO contactDTO, BindingResult result) {
        try {
            if(result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages.get(0));
            }
            Contact contact = contactService.createContact(contactDTO);
            return ResponseEntity.ok(contact);
        } catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_STAFF')")
    public ResponseEntity<?> getContacts() {
        try {
            List<ContactResponseDTO> contacts = contactService.getAllContact();
            return ResponseEntity.ok(contacts);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_STAFF')")
    public ResponseEntity<?> confirmCantact(@PathVariable("id") Long id, @RequestBody String x) {
        try {
            Contact contact = contactService.confirmContact(id);
            return ResponseEntity.ok(contact);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
