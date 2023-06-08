package bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import bookstore.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
