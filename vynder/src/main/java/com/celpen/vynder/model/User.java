package com.celpen.vynder.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Builder;


@Entity
@Data
@Builder
@Table(name = "users")
public class User extends AbstractEntity {

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

}
