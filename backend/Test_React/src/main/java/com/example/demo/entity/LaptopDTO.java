package com.example.demo.entity;

import java.sql.Date;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LaptopDTO {
	private int id;
	private String name;
	private int price;
	private String brand;
    private String nsx;
//    private String Image;
    // getter, setter
}

