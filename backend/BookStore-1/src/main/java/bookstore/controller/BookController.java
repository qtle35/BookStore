package bookstore.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import bookstore.entity.Book;
import bookstore.entity.BookDTO;
import bookstore.service.BookService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class BookController {

	@Autowired
	BookService bookService;

	@GetMapping("/books")
	public List<BookDTO> getAllBooks() {
		return bookService.getAllBooks();
	}

	@PostMapping(value = "/books", consumes = { "multipart/form-data" })
	public ResponseEntity<?> createBook(@ModelAttribute BookDTO bookDto,
			@RequestPart(name = "image1", required = false) MultipartFile image) {
		try {
			Book createdBook = bookService.createBook(bookDto, image);
			return ResponseEntity.ok(createdBook);
		} catch (IOException e) {
			String errorMessage = "Failed to create book: " + e.getMessage();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
		}
	}

	@GetMapping("/books/{id}")
	public BookDTO getBook(@PathVariable String id) {
		return bookService.getBook(id);
	}

	@DeleteMapping("/books/{id}")
	public void deleteBook(@PathVariable String id) {
		bookService.deleteBook(id);
	}

	@PutMapping(value = "books/{id}", consumes = { "multipart/form-data" })
	public Book updateBook(@ModelAttribute Book Book, @PathVariable String id,
			@RequestPart(value = "image1", required = false) MultipartFile image) throws IOException {
		return bookService.updateBook(Book, id, image);
	}
}

//@GetMapping("/Books")
//public List<Book> getAllBooks(@RequestParam(required = false) String name){
//	if(name == null)return BookRepository.findAll();
//	return BookRepository.findByNameContainsOrBrandContains(name, name);
//		
//}
//@PostMapping("/Books")
//public ResponseEntity<String> createBook(@Validated @RequestBody Book Book) {
//    List<Book> check = BookRepository.findByNameContainsAndBrandContains(Book.getName(), Book.getBrand());
//    if (check.isEmpty()) {
//        BookRepository.save(Book);
//        return ResponseEntity.ok("Book created successfully");
//    } else {
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Book with the same name and brand already exists");
//    }
//}