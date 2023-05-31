package bookstore.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import bookstore.entity.Comment;
import bookstore.repository.CommentRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CommentController {

    private final CommentRepository commentRepository;
    @Autowired
    public CommentController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @PostMapping("/comments")
    public ResponseEntity<Comment> saveComment(@ModelAttribute Comment comment) {
        Comment savedComment = commentRepository.save(comment);
        return ResponseEntity.ok(savedComment);
    }


    @GetMapping("/comments/{id}")
    public List<Comment> showComments(@PathVariable String id) {
    	int id1 = Integer.parseInt(id);
    	List<Comment> lcm = commentRepository.findByBookId(id1);
        return lcm;
    }
    @DeleteMapping("/comments/{id}")
    public void deleteComment(@PathVariable String id) {
    	commentRepository.deleteById(Long.parseLong(id));
    }
}

