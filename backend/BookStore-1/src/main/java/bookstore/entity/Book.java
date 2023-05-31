package bookstore.entity;

import java.sql.Date;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="books")
@AllArgsConstructor
@NoArgsConstructor
public class Book {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column
	private String title;

	@Column
	private String author;

	@Column
	private String category;
	
	@Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;

	private Date date;

	private int sold, page, price;
	
	@Column
	private String imagePath;
}
