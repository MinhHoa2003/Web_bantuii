package com.example.shop.service.impl;

import com.example.shop.dto.ContactDTO;
import com.example.shop.dto.ContactResponseDTO;
import com.example.shop.entity.Contact;
import com.example.shop.exception.DataNotFoundException;
import com.example.shop.repository.ContactRepository;
import com.example.shop.service.IContactService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ContactServiceImpl implements IContactService {

    private final ContactRepository contactRepository;
    private final ModelMapper modelMapper;
    @Override
    public Contact createContact(ContactDTO contactDTO) {
        Contact contact = modelMapper.map(contactDTO, Contact.class);
        contact.setDate(new Date());
        contact.setStatus("pending");
        return contactRepository.save(contact);
    }

    @Override
    public List<ContactResponseDTO> getAllContact() {
        List<Contact> contactList = contactRepository.findAll();
        List<ContactResponseDTO> contacts = new ArrayList<>();
        for(Contact item : contactList) {
            ContactResponseDTO contactResponseDTO = modelMapper.map(item, ContactResponseDTO.class);
            contacts.add(contactResponseDTO);
        }
        return contacts;
    }

    @Override
    public Contact confirmContact(Long id) {
        Contact oldContact = contactRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find contact with id: " + id));
        if (oldContact != null) {
            oldContact.setStatus("processed");
            return contactRepository.save(oldContact);
        } else {
            throw new DataNotFoundException("Contact is null");
        }
    }
}
