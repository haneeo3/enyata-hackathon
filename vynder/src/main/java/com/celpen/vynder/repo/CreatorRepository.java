package com.celpen.vynder.repo;

import com.celpen.vynder.model.Brand;
import com.celpen.vynder.model.Creator;
import com.celpen.vynder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CreatorRepository extends JpaRepository<Creator, Long> {

    Optional<Creator> findByUserId(Long userId);

    Optional<Creator> findByUser(User user);
}
