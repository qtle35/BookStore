package com.example.demo.laptop;

import java.sql.Date;

public class Laptop {
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
	
}
