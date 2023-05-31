package bookstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bookstore.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findByBookId(int id);
}

