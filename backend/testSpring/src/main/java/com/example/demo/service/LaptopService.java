package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Laptop;

public interface LaptopService {
	List<Laptop> getallLaptop();
	void deleteLaptop(int id);
	Laptop saveLaptop(Laptop laptop);
	Laptop selectLaptop(int id);
//	Laptop updateLaptop(int id);
}
