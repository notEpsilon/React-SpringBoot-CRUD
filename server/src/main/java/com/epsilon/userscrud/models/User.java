package com.epsilon.userscrud.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class User {
    private String username;
    private String password;
    private LocalDateTime createdAt;
}
