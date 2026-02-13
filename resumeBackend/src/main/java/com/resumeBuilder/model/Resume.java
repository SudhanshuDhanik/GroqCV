package com.resumeBuilder.model;

import lombok.Data;

import java.util.List;

    @Data
    public class Resume {

        // Basic Details
        private String fullName;
        private String email;
        private String phone;
        private String address;
        private String linkedin;
        private String github;

        // Summary / Objective
        private String summary;

        // Education Section
        private List<Education> educationList;

        // Skills Section
        private List<String> skills;

        // Experience Section
        private List<Experience> experiences;

        // Project Section
        private List<Project> projects;

        // Internship Section (optional)
        private List<Internship> internships;

        // Achievements (optional)
        private List<String> achievements;

        // Template preference
        private String selectedTemplate; // e.g., "template1", "template2", "template3"


    }

