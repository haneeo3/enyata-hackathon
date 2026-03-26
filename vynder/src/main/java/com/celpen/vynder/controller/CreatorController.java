package com.celpen.vynder.controller;

import com.celpen.vynder.dto.request.CreateCreatorRequest;
import com.celpen.vynder.dto.request.CreatorRequest;
import com.celpen.vynder.dto.request.UpdateCreatorRequest;
import com.celpen.vynder.dto.response.CreatorResponse;
import com.celpen.vynder.model.Creator;
import com.celpen.vynder.model.User;
import com.celpen.vynder.service.CreatorService;
import com.celpen.vynder.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/creators")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class CreatorController {


    private final CreatorService creatorService;

    @PostMapping("/create")
    public CreatorResponse createProfile(@RequestBody CreateCreatorRequest request) {
        return creatorService.createProfile(request);
    }

    @PutMapping
    public CreatorResponse update(@RequestBody UpdateCreatorRequest request) {
        return creatorService.update(request);
    }

    // Fetch all creators
    @GetMapping
    public List<CreatorResponse> getAllCreators() {
        return creatorService.getAllCreators();
    }

    // Fetch a single creator by profile ID
    @GetMapping("/{id}")
    public CreatorResponse getCreator(@PathVariable Long id) {
        return creatorService.getCreatorById(id)
                .orElseThrow(() -> new RuntimeException("Creator not found"));
    }

}
