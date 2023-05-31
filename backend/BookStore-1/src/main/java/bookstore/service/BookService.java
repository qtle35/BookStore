package bookstore.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import bookstore.entity.Book;
import bookstore.entity.BookDTO;
import bookstore.repository.BookRepository;

@Service
public class BookService {

	@Autowired
	BookRepository bookRepository;

	public List<BookDTO> getAllBooks() {
		List<Book> Books = bookRepository.findAll();
		List<BookDTO> BookDTOs = new ArrayList<>();
		for (Book Book : Books) {
			BookDTO BookDTO = mapBookToDTO(Book);
			BookDTOs.add(BookDTO);
		}
		return BookDTOs;
	}

	public Book createBook(BookDTO bookDto, MultipartFile image) throws IOException {
	    ModelMapper mapper = new ModelMapper();
	    Book book = mapper.map(bookDto, Book.class);
	    
	    List<Book> existingBooks = bookRepository.findByAuthorAndTitle(book.getAuthor(), book.getTitle());
	    if (!existingBooks.isEmpty()) {
	        throw new IOException("Sách đã tồn tại");
	    }
	    
	    Book savedBook = bookRepository.save(book);
	    
	    String imageFolderPath = "src/main/resources/images/Books/";
	    Path folderPath = Paths.get(imageFolderPath);
	    if (!Files.exists(folderPath)) {
	        Files.createDirectories(folderPath);
	    }
	    if (!image.isEmpty()) {
	        String fileName = savedBook.getId() + getFileExtension(image.getOriginalFilename());
	        Path imagePath = Paths.get(imageFolderPath + fileName);
	        Files.write(imagePath, image.getBytes());
	        savedBook.setImagePath(imagePath.toString());
	    }
	    
	    return bookRepository.save(savedBook);
	}

	public BookDTO getBook(String id) {
		int id1 = Integer.parseInt(id);
		Book Book = bookRepository.existsById(id1) ? bookRepository.findById(id1).get() : null;
		BookDTO BookDTO = mapBookToDTO(Book);
		return BookDTO;
	}

	public void deleteBook(String id) {
		bookRepository.deleteById(Integer.parseInt(id));
	}

	public Book updateBook(Book Book, String id, MultipartFile image) throws IOException {
		Book exisBook = bookRepository.findById(Integer.parseInt(id)).get();
		Book.setImagePath(exisBook.getImagePath());
		String imageFolderPath = Book.getImagePath();
		Path folderPath = Paths.get(imageFolderPath);
		if (image != null) {
			Files.copy(image.getInputStream(), folderPath, StandardCopyOption.REPLACE_EXISTING);
		}
		return bookRepository.save(Book);
	}

	private BookDTO mapBookToDTO(Book Book) {
		ModelMapper mapper = new ModelMapper();
		BookDTO BookDTO = mapper.map(Book, BookDTO.class);
		if (Book.getImagePath() != null && !Book.getImagePath().isEmpty()) {
			File imageFile = new File(Book.getImagePath());
			if (imageFile.exists()) {
				byte[] imageBytes = null;
				try {
					imageBytes = Files.readAllBytes(imageFile.toPath());
				} catch (IOException e) {
					e.printStackTrace();
				}
				BookDTO.setImage(Base64.getEncoder().encodeToString(imageBytes));
			}
		}
		return BookDTO;
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
