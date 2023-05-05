package com.example.demo.laptop;


import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@Controller
public class LaptopController {
	@GetMapping("/laptops2")
	public String getLaptop(Model model) {
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		ArrayList<Laptop> Laptops = new ArrayList<>();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
			statement = connection.createStatement();
			resultSet = statement.executeQuery("select * from laptop");
			
			while (resultSet.next()) {
//				System.out.println(1);s
				int id = resultSet.getInt("id");
				String name = resultSet.getString("name");
				int price = resultSet.getInt("price");
				String brand = resultSet.getString("brand");
				int sold = resultSet.getInt("sold");
				Date nsx = resultSet.getDate("nsx");
				Laptops.add(new Laptop(id, name, price, brand, sold == 0 ? false : true,nsx));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("laptops", Laptops);
		return "laptops";

	}

	@GetMapping("/laptop/{id}")
	public String getLaptop(Model model, @PathVariable String id) {
		model.addAttribute("id", id);
		Connection connection = null;
		PreparedStatement ps = null;
		ResultSet result = null;

		Laptop Laptop = new Laptop();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
			ps = connection.prepareStatement("select * from laptop where id = ?");
			ps.setInt(1, Integer.valueOf(id));
			result = ps.executeQuery();
			while (result.next()) {
				Laptop.setId(result.getInt("id"));
				Laptop.setName(result.getString("name"));
				Laptop.setPrice(result.getInt("price"));
				Laptop.setBrand(result.getString("brand"));
				Laptop.setSold(result.getInt("sold") != 0 ? true : false);
				Laptop.setNsx(result.getDate("nsx"));
			}
		} // End of try block
		catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("laptop", Laptop);
		return "laptop-detail";
	}
	
	@DeleteMapping("/laptop/{id}")
	public String deleteLaptop(@PathVariable String id) {
		Connection connection = null;
		PreparedStatement ps = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
			ps = connection.prepareStatement("delete from laptop where id=?");
			ps.setString(1, id);
			ps.execute();
		} // End of try block
		catch (Exception e) {
			e.printStackTrace();
		}
		return "redirect:/laptops2";
	}
	
	@PostMapping("/laptop/save/{id}")
	public String postLaptop(@ModelAttribute("laptop") Laptop Laptop, Model model) {
		Connection connection = null;
		PreparedStatement ps = null;
		PreparedStatement ps1 = null;
		ResultSet resultSet = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
			ps = connection.prepareStatement("insert into laptop values (?, ?, ?, ?, ?, ?)");
			ps1 = connection.prepareStatement("SELECT * FROM laptop WHERE brand=? and nsx=?");
			ps1.setString(1, Laptop.getBrand());
			ps1.setDate(2, Laptop.getNsx());
			resultSet = ps1.executeQuery();
			int count=0;
			while(resultSet.next()) {
				count+=1;
				if(count>0) {
					model.addAttribute("mess","laptop da ton tai");
					Laptop.setId(-1);
					model.addAttribute("laptop", Laptop);
					
					return "laptop-detail";
				}
			}
			ps.setInt(1, Laptop.getId());
			ps.setString(2, Laptop.getName());
			ps.setInt(3, Laptop.getPrice());
			ps.setString(4, Laptop.getBrand());
			ps.setInt(5, Laptop.isSold() == true ? 1:0);
			ps.setDate(6, Laptop.getNsx());
			ps.execute();
		} // End of try block
		catch (Exception e) {
			e.printStackTrace();
		}
		return "redirect:/laptops2";
	}
	
	@PutMapping("/laptop/save/{id}")
	public String putLaptop(@ModelAttribute("laptop") Laptop Laptop, @PathVariable String id, Model model) {
		Connection connection = null;
		PreparedStatement ps = null;
		PreparedStatement ps1 = null;
		ResultSet resultSet = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
			ps = connection.prepareStatement("update Laptop set id=?, name=?, author=?, brand=?, sold=? where id=?");
			ps1 = connection.prepareStatement("SELECT * FROM laptop WHERE brand=? and nsx=?");
			ps1.setString(1, Laptop.getBrand());
			ps1.setDate(2, Laptop.getNsx());
			resultSet = ps1.executeQuery();
			int count=0;
			while(resultSet.next()) {
				count+=1;
				if(count>0) {
					model.addAttribute("mess","laptop da ton tai");
					Laptop.setId(-1);
					model.addAttribute("laptop", Laptop);
					
					return "laptop-detail";
				}
			}
			ps.setInt(1, Laptop.getId());
			ps.setString(2, Laptop.getName());
			ps.setInt(3, Laptop.getPrice());
			ps.setString(4, Laptop.getBrand());
			ps.setInt(5, Laptop.isSold() == true ? 1:0);
			ps.setDate(6, Laptop.getNsx());
			ps.execute();
		} // End of try block
		catch (Exception e) {
			e.printStackTrace();
		}
		return "redirect:/laptops2";
	}
}
