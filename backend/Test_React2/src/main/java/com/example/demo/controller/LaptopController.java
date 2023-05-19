package com.example.demo.controller;

import com.example.demo.entity.Laptop;
import com.example.demo.entity.LaptopDTO;
import com.example.demo.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("api/v1/")
public class LaptopController {

    @Autowired
    LaptopService laptopService;

    @GetMapping("/laptops")
    public List<LaptopDTO> getAllLaptops() {
        return laptopService.getAllLaptops();
    }

    @PostMapping(value = "/laptops", consumes = {"multipart/form-data"})
    public Laptop createLaptop(@ModelAttribute() LaptopDTO laptopDto, @RequestPart("image1") MultipartFile image) throws IOException {
    	System.out.println(laptopDto.toString());
        return laptopService.createLaptop(laptopDto, image);
    }

    @GetMapping("/laptops/{id}")
    public LaptopDTO getLaptop(@PathVariable String id) {
        return laptopService.getLaptop(id);
    }

    @DeleteMapping("/laptops/{id}")
    public void deleteLaptop(@PathVariable String id) {
        laptopService.deleteLaptop(id);
    }

    @PutMapping(value = "laptops/{id}", consumes = {"multipart/form-data"})
    public Laptop updateLaptop(@ModelAttribute Laptop laptop, @PathVariable String id, @RequestPart("image1") MultipartFile image) throws IOException {
    	System.out.println(laptop.toString());
        return laptopService.updateLaptop(laptop, id, image);
    }
}

//@GetMapping("/laptops")
//public List<Laptop> getAllLaptops(@RequestParam(required = false) String name){
//	if(name == null)return laptopRepository.findAll();
//	return laptopRepository.findByNameContainsOrBrandContains(name, name);
//		
//}
//@PostMapping("/laptops")
//public ResponseEntity<String> createLaptop(@Validated @RequestBody Laptop laptop) {
//    List<Laptop> check = laptopRepository.findByNameContainsAndBrandContains(laptop.getName(), laptop.getBrand());
//    if (check.isEmpty()) {
//        laptopRepository.save(laptop);
//        return ResponseEntity.ok("Laptop created successfully");
//    } else {
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Laptop with the same name and brand already exists");
//    }
//}