package com.celpen.vynder.service;

import com.celpen.vynder.dto.request.CreateCampaignRequest;
import com.celpen.vynder.dto.request.UpdateCampaignRequest;
import com.celpen.vynder.dto.response.CampaignResponse;

import java.util.List;

public interface CampaignService {

    CampaignResponse create(CreateCampaignRequest request);

    CampaignResponse update(UpdateCampaignRequest request);

    List<CampaignResponse> getAll();
}
