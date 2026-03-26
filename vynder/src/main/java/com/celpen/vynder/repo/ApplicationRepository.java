package com.celpen.vynder.repo;

import com.celpen.vynder.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByCampaignId(Long campaignId);

    List<Application> findByCreatorId(Long creatorId);

}
