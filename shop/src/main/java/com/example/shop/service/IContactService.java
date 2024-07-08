package com.example.shop.service;

import com.example.shop.dto.ContactDTO;
import com.example.shop.dto.ContactResponseDTO;
import com.example.shop.entity.Contact;

import java.util.List;

public interface IContactService {
    Contact createContact(ContactDTO contactDTO);

    List<ContactResponseDTO> getAllContact();

    Contact confirmContact(Long id);
}
