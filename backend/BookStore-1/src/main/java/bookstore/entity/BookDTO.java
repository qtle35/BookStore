package bookstore.entity;

import java.io.File;
import java.sql.Date;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO {
	private int id;
	private String title;
	private String author;
	private String category;
	private String description;
	private Date date;
	private int sold, page, price;
	private String image;
}
