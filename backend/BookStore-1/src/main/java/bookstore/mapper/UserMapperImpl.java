package bookstore.mapper;

import java.util.List;

import org.springframework.stereotype.Service;

import bookstore.controller.payload.UserDto;
import bookstore.entity.User;

@Service
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole());
    }
}
