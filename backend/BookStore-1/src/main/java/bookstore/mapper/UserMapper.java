package bookstore.mapper;

import bookstore.controller.payload.UserDto;
import bookstore.entity.User;

public interface UserMapper {

    UserDto toUserDto(User user);
}
