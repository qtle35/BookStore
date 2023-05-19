package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Laptop;

public interface LaptopRepository extends JpaRepository<Laptop, Integer>{

	List<Laptop> findByNameContainsOrBrandContains(String name, String brand);
}
