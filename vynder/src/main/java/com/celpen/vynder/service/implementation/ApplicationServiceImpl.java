package com.celpen.vynder.service.implementation;


import com.celpen.vynder.dto.request.CreateApplicationRequest;
import com.celpen.vynder.dto.request.UpdateApplicationStatusRequest;
import com.celpen.vynder.dto.response.ApplicationResponse;
import com.celpen.vynder.exception.InvalidRequestException;
import com.celpen.vynder.model.*;
import com.celpen.vynder.repo.ApplicationRepository;
import com.celpen.vynder.repo.CampaignRepository;
import com.celpen.vynder.service.ApplicationService;
import com.celpen.vynder.service.AuthService;
import com.celpen.vynder.service.CreatorService;
import com.celpen.vynder.service.PaymentService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {


    private final ApplicationRepository applicationRepository;
    private final CampaignRepository campaignRepository;
    private final AuthService authService;
    private final CreatorService creatorService;
    private final PaymentService paymentService;


    public ApplicationResponse apply(CreateApplicationRequest request) {

        User user = authService.getUserEntityByEmail(request.getCreatorEmail());


        if (user.getRole() != Role.CREATOR) {
            throw new RuntimeException("Only creators can apply");
        }

        Creator creator = creatorService.getCreatorEntityByUser(user);

        Campaign campaign = campaignRepository.findById(request.getCampaignId())
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        Application application = Application.builder()
                .creator(creator)
                .campaign(campaign)
                .message(request.getMessage())
                .status(ApplicationStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();


        Application saved = applicationRepository.save(application);

        return mapToResponse(saved);
    }

    @Transactional
    public ApplicationResponse updateStatus(UpdateApplicationStatusRequest request) {

        Application application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new RuntimeException("Application not found"));

        ApplicationStatus status;

        try {
            status = ApplicationStatus.valueOf(request.getStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidRequestException("Invalid application status");
        }

        application.setStatus(status);

        if (status == ApplicationStatus.APPROVED) {
            paymentService.payCreator(application);
        }

        Application updated = applicationRepository.save(application);

        return mapToResponse(updated);
    }

    public List<ApplicationResponse> getByCampaign(Long campaignId) {
        return applicationRepository.findByCampaignId(campaignId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ApplicationResponse mapToResponse(Application app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .message(app.getMessage())
                .status(app.getStatus().name())
                .createdAt(app.getCreatedAt())
                .creatorName(app.getCreator().getName())
                .creatorEmail(app.getCreator().getUser().getEmail())
                .campaignTitle(app.getCampaign().getTitle())
                .build();
    }

}
