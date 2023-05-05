package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Laptop;

public interface LaptopRepository extends JpaRepository<Laptop, Integer>{

}
