package bookstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class BookStore1Application {

	public static void main(String[] args) {
		SpringApplication.run(BookStore1Application.class, args);
	}

}
