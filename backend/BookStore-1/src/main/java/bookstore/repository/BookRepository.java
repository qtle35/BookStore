package bookstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bookstore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Integer>{
	List<Book> findByAuthorAndTitle(String author, String title);
}
