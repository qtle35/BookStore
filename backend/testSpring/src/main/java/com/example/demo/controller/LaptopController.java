package com.example.demo.controller;

import java.lang.StackWalker.Option;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Laptop;
import com.example.demo.repository.LaptopRepository;
import com.example.demo.service.LaptopService;

import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin
@RestController
public class LaptopController {
	@Autowired
	LaptopRepository laptopRepository;
	
	@GetMapping("/laptops")
	public List<Laptop> getAllLaptops(){
//		response.addHeader("Access-Control-Allow-Origin", "*");
		return laptopRepository.findAll();
	}
	
//	@GetMapping("/laptop/{id}")
//	public String getLaptop(Model model, @PathVariable String id) {
//		model.addAttribute("id",id);
//		Laptop laptop = new Laptop();
//		if(laptopService.selectLaptop(Integer.parseInt(id))!=null) {
//			laptop= laptopService.selectLaptop(Integer.parseInt(id));
//		}
//		model.addAttribute("laptop", laptop);
//		return "laptop-detail";
//	}
//	
//	@DeleteMapping("/laptop/{id}")
//	public String deleteLaptop(@PathVariable String id) {
//		laptopService.deleteLaptop(Integer.parseInt(id));
//		return "redirect:/laptop";
//	}
//	
//	@PostMapping("/laptop/save/{id}")
//	public String saveLaptop(@ModelAttribute("laptop") Laptop laptop) {
//		laptopService.saveLaptop(laptop);
//		return "redirect:/laptop";
//	}
//	@PutMapping("/laptop/save/{id}")
//	public String updateLaptop(@ModelAttribute("laptop") Laptop laptop, @PathVariable String id) {
//		Laptop laptop2 = laptopService.selectLaptop(Integer.parseInt(id));
//		laptop2.setBrand(laptop.getBrand());
//		laptop2.setName(laptop.getName());
//		laptop2.setNsx(laptop.getNsx());
//		laptop2.setPrice(laptop.getPrice());
//		laptop2.setSold(laptop.isSold());
//		laptopService.saveLaptop(laptop2);
//		return "redirect:/laptop";
//	}
}
