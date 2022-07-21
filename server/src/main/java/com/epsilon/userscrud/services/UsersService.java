package com.epsilon.userscrud.services;

import com.epsilon.userscrud.entities.UserEntity;
import com.epsilon.userscrud.models.User;

import java.util.List;

public interface UsersService {
    List<UserEntity> getAllUsers();

    UserEntity createUser(UserEntity user);

    void deleteUser(Long id);
}
