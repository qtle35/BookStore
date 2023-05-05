package com.example.demo.book;

import java.sql.Connection;
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
public class BookController {
	private String dbUrl = "jdbc:mysql://localhost:3306/jdbc_demo";
	private String dbUsername = "root"; 
	private String dbPassword = "1234";
	@GetMapping("/books2")
	public String getBook(Model model) {
		Connection connection = null;
		Statement statement = null;
		ResultSet resultSet = null;
		ArrayList<Book> books = new ArrayList<>();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
			statement = connection.createStatement();
			resultSet = statement.executeQuery("select * from book");
			while (resultSet.next()) {
				int bookcode = resultSet.getInt("bookcode");
				String title = resultSet.getString("title");
				String author = resultSet.getString("author");
				String category = resultSet.getString("category");
				int approved = resultSet.getInt("approved");
				books.add(new Book(bookcode, title, author, category, approved == 0 ? false : true));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("books", books);
		return "books";

	}

	@GetMapping("/book/{bookcode}")
	public String getBook(Model model, @PathVariable String bookcode) {
		model.addAttribute("bookcode", bookcode);
		Connection connection = null;
		PreparedStatement ps = null;
		ResultSet result = null;

		Book book = new Book();
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
			ps = connection.prepareStatement("select * from book where bookcode = ?");
			ps.setInt(1, Integer.valueOf(bookcode));
			result = ps.executeQuery();
			while (result.next()) {
				book.setBookcode(result.getInt("bookcode"));
				book.setTitle(result.getString("title"));
				book.setAuthor(result.getString("author"));
				book.setCategory(result.getString("category"));
				book.setApproved(result.getInt("approved") != 0 ? true : false);
			}
		} // End of try block
		catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("book", book);
		return "book-detail";
	}
	
	@DeleteMapping("/book/{bookcode}")
	public String deleteBook(@PathVariable String bookcode) {
		Connection connection = null;
		PreparedStatement ps = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
			ps = connection.prepareStatement("delete from book where bookcode=?");
			ps.setString(1, bookcode);
			ps.execute();
		} // End of try block
		catch (Exception e) {
			e.printStackTrace();
		}
		return "redirect:/books2";
	}
	
	@PostMapping("/book/save/{bookcode}")
	public String postBook(@ModelAttribute("book") Book book, Model model) {
		Connection connection = null;
		PreparedStatement ps = null;
		PreparedStatement ps1 = null;
		ResultSet resultSet = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
			ps = connection.prepareStatement("insert into book values (?, ?, ?, ?, ?)");
			ps1 = connection.prepareStatement("SELECT * FROM book WHERE title=? and author=?");
			ps1.setString(1, book.getTitle());
			ps1.setString(2, book.getAuthor());
			resultSet = ps1.executeQuery();
			int count=0;
			while(resultSet.next()) {
				count+=1;
				if(count>0) {
					model.addAttribute("mess","sach da ton tai");
					book.setBookcode(-1);
					model.addAttribute("book", book);
					
					return "book-detail";
				}
			}
			ps.setInt(1, book.getBookcode());
			ps.setString(2, book.getTitle());
			ps.setString(3, book.getAuthor());
			ps.setString(4, book.getCategory());
			ps.setInt(5, book.isApproved() == true ? 1:0);
			ps.execute();
		} // End of try block
		catch (Exception e) {
			e.printStackTrace();
		}
		return "redirect:/books2";
	}
	
	@PutMapping("/book/save/{bookcode}")
	public String putBook(@ModelAttribute("book") Book book, @PathVariable String bookcode, Model model) {
		Connection connection = null;
		PreparedStatement ps = null;
		PreparedStatement ps1 = null;
		ResultSet resultSet = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbc_demo", "root", "1234");
			ps = connection.prepareStatement("update book set bookcode=?, title=?, author=?, category=?, approved=? where bookcode=?");
			ps1 = connection.prepareStatement("SELECT * FROM book WHERE title=? and author=?");
			ps1.setString(1, book.getTitle());
			ps1.setString(2, book.getAuthor());
			resultSet = ps1.executeQuery();
			int count=0;
			while(resultSet.next()) {
				count+=1;
				if(count>0) {
					model.addAttribute("mess","sach da ton tai");
					model.addAttribute("book", book);
					
					return "book-detail";
				}
			}
			ps.setInt(1, book.getBookcode());
			ps.setString(2, book.getTitle());
			ps.setString(3, book.getAuthor());
			ps.setString(4, book.getCategory());
			ps.setInt(5, book.isApproved() == true ? 1:0);
			ps.setInt(6, book.getBookcode());
			ps.execute();
		} // End of try block
		catch (Exception e) {
			e.printStackTrace();
		}
		return "redirect:/books2";
	}
}