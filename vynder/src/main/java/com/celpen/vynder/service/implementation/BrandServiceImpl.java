package com.celpen.vynder.service.implementation;

import com.celpen.vynder.dto.request.CreateBrandRequest;
import com.celpen.vynder.dto.request.UpdateBrandRequest;
import com.celpen.vynder.dto.response.BrandResponse;
import com.celpen.vynder.model.Brand;
import com.celpen.vynder.model.User;
import com.celpen.vynder.repo.BrandRepository;
import com.celpen.vynder.service.BrandService;
import com.celpen.vynder.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BrandServiceImpl implements BrandService {


    private final BrandRepository brandRepository;
    private final AuthService authService;




    public BrandResponse createProfile(CreateBrandRequest request) {

        User user = authService.getUserEntityByEmail(request.getEmail());

        if (!user.getRole().name().equals("BRAND")) {
            throw new RuntimeException("Only brands allowed");
        }


        Brand brand = Brand.builder()
                .user(user)
                .companyName(request.getCompanyName())
                .industry(request.getIndustry())
                .website(request.getWebsite())
                .description(request.getDescription())
                .build();

        Brand saved = brandRepository.save(brand);

        return mapToResponse(saved);
    }

    public BrandResponse update(UpdateBrandRequest request) {
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        brand.setCompanyName(request.getCompanyName());
        brand.setIndustry(request.getIndustry());
        brand.setWebsite(request.getWebsite());
        brand.setDescription(request.getDescription());

        Brand updated = brandRepository.save(brand);

        return mapToResponse(updated);
    }


    public List<BrandResponse> getAllBrands() {
        return brandRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public BrandResponse getBrandById(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        return mapToResponse(brand);
    }

    public Brand getBrandEntityByUser(User user) {
        return brandRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Brand profile not found"));
    }

    // mapper
    private BrandResponse mapToResponse(Brand brand) {
        return BrandResponse.builder()
                .id(brand.getId())
                .companyName(brand.getCompanyName())
                .industry(brand.getIndustry())
                .website(brand.getWebsite())
                .description(brand.getDescription())
                .email(brand.getUser().getEmail())
                .build();
    }
}

