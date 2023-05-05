package com.example.demo.entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="laptop")
public class Laptop {
	
	@Id
	private int id;
	private String name;
	private int price;
	private String brand;
	private boolean sold;
	private Date nsx;
	
	
	public Laptop(int id, String name, int price, String brand, boolean sold, Date nsx) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.brand = brand;
		this.sold = sold;
		this.nsx = nsx;
	}
	public Laptop() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public boolean isSold() {
		return sold;
	}
	public void setSold(boolean sold) {
		this.sold = sold;
	}
	public Date getNsx() {
		return nsx;
	}
	public void setNsx(Date nsx) {
		this.nsx = nsx;
	}
	@Override
	public String toString() {
		return "Laptop [id=" + id + ", name=" + name + ", price=" + price + ", brand=" + brand + ", sold=" + sold
				+ ", nsx=" + nsx + "]";
	}
	
}
