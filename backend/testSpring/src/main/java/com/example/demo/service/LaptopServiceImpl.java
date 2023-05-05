package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Laptop;
import com.example.demo.repository.LaptopRepository;


@Service
public class LaptopServiceImpl implements LaptopService{
	
	
	private LaptopRepository laptopRepository;
	
	public LaptopServiceImpl(LaptopRepository laptopRepository) {
		super();
		this.laptopRepository = laptopRepository;
	}

	@Override
	public List<Laptop> getallLaptop() {
		// TODO Auto-generated method stub
		return laptopRepository.findAll();
	}

	@Override
	public void deleteLaptop(int id) {
		laptopRepository.deleteById(id);
		
	}

	@Override
	public Laptop saveLaptop(Laptop laptop) {
		return laptopRepository.save(laptop);
		
	}

	@Override
	public Laptop selectLaptop(int id) {
		return laptopRepository.existsById(id)?laptopRepository.findById(id).get():null;
		
	}

//	@Override
//	public Laptop updateLaptop(int id) {
//		// TODO Auto-generated method stub
//		return laptopRepository;
//	}
	
}
