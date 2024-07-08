package com.example.shop.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    //private final String CLOUD_NAME = "dorl0yxpe";
    private final String CLOUD_NAME = "hoahien";
    //private final String API_KEY = "999929732961462";
    private final String API_KEY = "379835385339246";
    //private final String API_SECRET = "DDuOOlQ5ewAOkgRjR5E1GawxXqc";
    private final String API_SECRET = "CrN9tbEgb32OMBWasjQa6Q1rFTo";
    @Bean
    public Cloudinary cloudinary(){
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name",CLOUD_NAME);
        config.put("api_key",API_KEY);
        config.put("api_secret",API_SECRET);

        return new Cloudinary(config);
    }
}
