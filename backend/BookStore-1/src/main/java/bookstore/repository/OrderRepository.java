package bookstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import bookstore.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByUsername(String name);
}

