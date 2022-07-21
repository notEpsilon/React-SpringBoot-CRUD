package com.epsilon.userscrud.repositories;

import com.epsilon.userscrud.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<UserEntity, Long> {
}
