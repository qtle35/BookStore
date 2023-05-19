package com.example.demo.service;

import com.example.demo.entity.Laptop;
import com.example.demo.entity.LaptopDTO;
import com.example.demo.repository.LaptopRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class LaptopService {

    @Autowired
    LaptopRepository laptopRepository;

    public List<LaptopDTO> getAllLaptops() {
        List<Laptop> laptops = laptopRepository.findAll();
        List<LaptopDTO> laptopDTOs = new ArrayList<>();
        for (Laptop laptop : laptops) {
            LaptopDTO laptopDTO = mapLaptopToDTO(laptop);
            laptopDTOs.add(laptopDTO);
        }
        return laptopDTOs;
    }

    public Laptop createLaptop(LaptopDTO laptopDto, MultipartFile image) throws IOException {
    	ModelMapper mapper = new ModelMapper();
    	Laptop laptop = mapper.map(laptopDto, Laptop.class);
        Laptop savedLaptop = laptopRepository.save(laptop);
        String imageFolderPath = "src/main/resources/images/laptops/";
        Path folderPath = Paths.get(imageFolderPath);
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }
        if (!image.isEmpty()) {
            String fileName = savedLaptop.getId() + getFileExtension(image.getOriginalFilename());
            Path imagePath = Paths.get(imageFolderPath + fileName);
            Files.write(imagePath, image.getBytes());
            savedLaptop.setImagePath(imagePath.toString());
        }
        return laptopRepository.save(savedLaptop);
    }

    public LaptopDTO getLaptop(String id) {
        int id1 = Integer.parseInt(id);
        Laptop laptop = laptopRepository.existsById(id1) ? laptopRepository.findById(id1).get() : null;
        LaptopDTO laptopDTO = mapLaptopToDTO(laptop);
        return laptopDTO;
    }
    public void deleteLaptop(String id) {
        laptopRepository.deleteById(Integer.parseInt(id));
    }

    public Laptop updateLaptop(Laptop laptop, String id, MultipartFile image) throws IOException {
        Laptop exisLaptop = laptopRepository.findById(Integer.parseInt(id)).get();
        System.out.println(exisLaptop.toString());
        laptop.setImagePath(exisLaptop.getImagePath());
        String imageFolderPath = laptop.getImagePath();
        Path folderPath = Paths.get(imageFolderPath);
        Files.copy(image.getInputStream(), folderPath, StandardCopyOption.REPLACE_EXISTING);
        return laptopRepository.save(laptop);
    }

    private LaptopDTO mapLaptopToDTO(Laptop laptop) {
        ModelMapper mapper = new ModelMapper();
        LaptopDTO laptopDTO = mapper.map(laptop, LaptopDTO.class);
        if (laptop.getImagePath() != null && !laptop.getImagePath().isEmpty()) {
            File imageFile = new File(laptop.getImagePath());
            if (imageFile.exists()) {
                byte[] imageBytes = null;
                try {
                    imageBytes = Files.readAllBytes(imageFile.toPath());
                } catch (IOException e) {
                    e.printStackTrace();
                }
                laptopDTO.setImage(Base64.getEncoder().encodeToString(imageBytes));
            }
        }
        return laptopDTO;
    }

    private String getFileExtension(String filename) {
        String extension = "";

        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < filename.length() - 1) {
            extension = filename.substring(dotIndex + 1).toLowerCase();
        }

        if (!extension.isEmpty()) {
            return "." + extension;
        } else {
            return ".jpg";
        }
    }
}
