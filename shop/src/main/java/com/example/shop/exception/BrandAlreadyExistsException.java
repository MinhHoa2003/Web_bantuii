package com.example.shop.exception;

public class BrandAlreadyExistsException extends RuntimeException {
    public BrandAlreadyExistsException(String s) {
        super(s);
    }
}
