package bookstore.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bookstore.controller.payload.UserDto;
import bookstore.entity.Order;
import bookstore.entity.OrderItem;
import bookstore.entity.User;
import bookstore.repository.OrderItemRepository;
import bookstore.repository.OrderRepository;
import bookstore.security.CustomUserDetails;
import bookstore.service.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
	
	private final OrderRepository orderRepository;
	private final OrderItemRepository orderItemRepository;
	private final UserService userService;


	@PostMapping("/checkout")
	public void checkout(@RequestBody Order order) {
		Order order2 = new Order(order.getUsername(),order.getAddress(), order.getOrderdate(), order.getPhone(), order.getTotal());
		Order order3 = orderRepository.save(order2);
		for(OrderItem item: order.getItems()) {
			OrderItem item2 = new OrderItem(item.getTitle(), item.getPrice(), item.getQuantity());
			item2.setOrder(order3);
			orderItemRepository.save(item2);
		}
	}
	@GetMapping("/checkout")
	public List<Order> getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
		User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
		List<Order> lr = orderRepository.findByUsername(user.getUsername());
        return lr;
    }
	@DeleteMapping("/checkout/{id}")
    public void deleteOrder(@PathVariable String id) {
    	orderRepository.deleteById(Long.parseLong(id));
    }
}
