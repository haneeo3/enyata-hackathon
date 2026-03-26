package com.celpen.vynder.repo;

import com.celpen.vynder.model.Brand;
import com.celpen.vynder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand, Long> {

    Optional<Brand> findByUserId(Long userId);

    Optional<Brand> findByUser(User user);
}
