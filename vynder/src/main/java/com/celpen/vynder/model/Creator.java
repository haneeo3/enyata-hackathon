package com.celpen.vynder.model;


import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Table(name = "creators")
@Builder
public class Creator extends AbstractEntity{



    private String name;           // Display name
    private String niche;          // Tech, Lifestyle, etc.
    private int followers;         // Number of followers
    private double engagementRate; // Optional metric

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;             // Linked account


}
