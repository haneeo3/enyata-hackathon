package com.celpen.vynder.service;

import com.celpen.vynder.dto.request.CreateApplicationRequest;
import com.celpen.vynder.dto.request.UpdateApplicationStatusRequest;
import com.celpen.vynder.dto.response.ApplicationResponse;

import java.util.List;

public interface ApplicationService {

    ApplicationResponse apply(CreateApplicationRequest request);

    ApplicationResponse updateStatus(UpdateApplicationStatusRequest request);

    List<ApplicationResponse> getByCampaign(Long campaignId);
}
