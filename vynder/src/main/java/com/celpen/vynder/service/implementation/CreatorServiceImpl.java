package com.celpen.vynder.service.implementation;

import com.celpen.vynder.dto.request.CreateCreatorRequest;
import com.celpen.vynder.dto.request.UpdateCreatorRequest;
import com.celpen.vynder.dto.response.CreatorResponse;
import com.celpen.vynder.model.Creator;
import com.celpen.vynder.model.User;
import com.celpen.vynder.repo.CreatorRepository;
import com.celpen.vynder.service.AuthService;
import com.celpen.vynder.service.CreatorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CreatorServiceImpl implements CreatorService {

    private final CreatorRepository creatorRepository;
    private final AuthService authService;

    private CreatorResponse mapToResponse(Creator creator) {
        return CreatorResponse.builder()
                .id(creator.getId())
                .name(creator.getName())
                .niche(creator.getNiche())
                .followers(creator.getFollowers())
                .engagementRate(creator.getEngagementRate())
                .email(creator.getUser().getEmail())
                .build();
    }

    // Create a new creator profile
    public CreatorResponse createProfile(CreateCreatorRequest request) {

        User user = authService.getUserEntityByEmail(request.getEmail());

        if (!user.getRole().name().equals("CREATOR")) {
            throw new RuntimeException("Only CREATOR users allowed");
        }
        
        Creator creator = Creator.builder()
                .user(user)
                .name(request.getName())
                .niche(request.getNiche())
                .followers(request.getFollowers())
                .engagementRate(request.getEngagementRate())
                .build();
        Creator saved = creatorRepository.save(creator); // <-- must save entity


        return mapToResponse(creator);

    }

    public CreatorResponse update(UpdateCreatorRequest request) {
        Creator creator = creatorRepository.findById(request.getCreatorId())
                .orElseThrow(() -> new RuntimeException("Creator not found"));

        creator.setName(request.getName());
        creator.setNiche(request.getNiche());
        creator.setFollowers(request.getFollowers());
        creator.setEngagementRate(request.getEngagementRate());

        Creator updated = creatorRepository.save(creator);

        return mapToResponse(updated);
    }

    // Get all creators
    public List<CreatorResponse> getAllCreators() {
        return creatorRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get creator by ID
    public Optional<CreatorResponse> getCreatorById(Long id) {
        return creatorRepository.findById(id)
                .map(this::mapToResponse);
    }

    public Creator getCreatorEntityByUser(User user) {
        return creatorRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Brand profile not found"));
    }

    // Get creator by user ID
    public Optional<CreatorResponse> getByUserId(Long userId) {
        return creatorRepository.findByUserId(userId)
                .map(this::mapToResponse);
    }

}
