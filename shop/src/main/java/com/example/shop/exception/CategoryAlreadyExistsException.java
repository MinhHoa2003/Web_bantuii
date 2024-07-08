package com.example.shop.exception;

public class CategoryAlreadyExistsException extends RuntimeException {
    public CategoryAlreadyExistsException(String s) {
        super(s);
    }
}
