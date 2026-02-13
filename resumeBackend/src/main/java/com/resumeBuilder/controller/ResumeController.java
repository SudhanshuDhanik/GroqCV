package com.resumeBuilder.controller;


import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.resumeBuilder.model.*;
import com.resumeBuilder.service.AIRephraseService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/resume")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    private final AIRephraseService aiService;

    public ResumeController(AIRephraseService aiService) {
        this.aiService = aiService;
    }




    @PostMapping("/generate")
    public Resume receiveResume(@RequestBody Resume resume) {

        // Rephrase summary
        if (resume.getSummary() != null && !resume.getSummary().isEmpty()) {
            resume.setSummary(aiService.getRephraseText(resume.getSummary()));
        }

        // Rephrase experiences
        if (resume.getExperiences() != null) {
            resume.getExperiences().forEach(exp -> {
                if (exp.getDescription() != null && !exp.getDescription().isEmpty()) {
                    exp.setDescription(aiService.getRephraseText(exp.getDescription()));
                }

            });
        }

        // Rephrase internships
        if (resume.getInternships() != null) {
            resume.getInternships().forEach(intern -> {
                if (intern.getDescription() != null && !intern.getDescription().isEmpty()) {
                    intern.setDescription(aiService.getRephraseText(intern.getDescription()));
                }

            });
        }

        // Rephrase projects
        if (resume.getProjects() != null) {
            resume.getProjects().forEach(proj -> {
                if (proj.getDescription() != null && !proj.getDescription().isEmpty()) {
                    proj.setDescription(aiService.getRephraseText(proj.getDescription()));
                }

            });
        }

        return resume;
    }

        @PostMapping("/download")
        public ResponseEntity<byte[]> downloadResume(@RequestBody Resume resumeData) throws IOException {
            // Convert resumeData to HTML using a template or string builder
            String htmlContent = generateHtml(resumeData); // implement this with your template

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            ConverterProperties converterProperties = new ConverterProperties();
            HtmlConverter.convertToPdf(htmlContent, out, converterProperties);

            byte[] pdfBytes = out.toByteArray();

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + resumeData.getFullName() + "_Resume.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        }

        private String generateHtml(Resume resume) {
            // Simple inline HTML example. You can use Thymeleaf for full template
            StringBuilder html = new StringBuilder();
            html.append("<html><head><style>");
            html.append("body { font-family: Arial; }");
            html.append("h1 { color: black; }");
            html.append("h2 { color: black; margin-top: 20px; }");
            html.append("p, li { font-size: 14px; color: black; }");
            html.append("a { color: blue; text-decoration: underline; }");
            html.append("</style></head><body>");

            html.append("<h1>").append(resume.getFullName()).append("</h1>");
            html.append("<p>").append(resume.getEmail()).append(" | ").append(resume.getPhone()).append("</p>");
            if (resume.getLinkedin() != null) html.append("<p><a href='").append(resume.getLinkedin()).append("'>LinkedIn</a></p>");
            if (resume.getGithub() != null) html.append("<p><a href='").append(resume.getGithub()).append("'>GitHub</a></p>");
            html.append("<h2>Summary</h2><p>").append(resume.getSummary() != null ? resume.getSummary() : "").append("</p>");

            // Education
            if (resume.getEducationList() != null) {
                html.append("<h2>Education</h2>");
                for (Education edu : resume.getEducationList()) {
                    html.append("<p><strong>").append(edu.getDegree()).append("</strong>, ").append(edu.getInstitution()).append(" - ").append(edu.getGrade()).append("</p>");
                }
            }

            // Skills
            if (resume.getSkills() != null && !resume.getSkills().isEmpty()) {
                html.append("<h2>Skills</h2><ul>");
                for (String skill : resume.getSkills()) {
                    html.append("<li>").append(skill).append("</li>");
                }
                html.append("</ul>");
            }

            // Experiences
            if (resume.getExperiences() != null) {
                html.append("<h2>Experience</h2>");
                for (Experience exp : resume.getExperiences()) {
                    html.append("<p><strong>").append(exp.getRole()).append("</strong> at ").append(exp.getCompany())
                            .append(" (").append(exp.getDuration()).append(")</p>");
                    html.append("<p>").append(exp.getDescription()).append("</p>");
                }
            }

            // Projects
            if (resume.getProjects() != null) {
                html.append("<h2>Projects</h2>");
                for (Project proj : resume.getProjects()) {
                    html.append("<p><strong>").append(proj.getTitle()).append("</strong> (").append(proj.getTechnologies()).append(")</p>");
                    html.append("<p>").append(proj.getDescription()).append("</p>");
                }
            }

            // Internships
            if (resume.getInternships() != null) {
                html.append("<h2>Internships</h2>");
                for (Internship intern : resume.getInternships()) {
                    html.append("<p><strong>").append(intern.getRole()).append("</strong> at ").append(intern.getCompany())
                            .append(" (").append(intern.getDuration()).append(")</p>");
                    html.append("<p>").append(intern.getDescription()).append("</p>");
                }
            }

            // Achievements
            if (resume.getAchievements() != null && !resume.getAchievements().isEmpty()) {
                html.append("<h2>Achievements</h2><ul>");
                for (String ach : resume.getAchievements()) {
                    html.append("<li>").append(ach).append("</li>");
                }
                html.append("</ul>");
            }

            html.append("</body></html>");
            return html.toString();
        }
    }


