package com.resumeBuilder.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIRephraseService {

    @Value("${groq.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public AIRephraseService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getRephraseText(String summary) {

        try {

            String url = "https://api.groq.com/openai/v1/chat/completions";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "llama-3.3-70b-versatile");

            List<Map<String, String>> messages = new ArrayList<>();

            Map<String, String> message = new HashMap<>();
            message.put("role", "user");
            message.put("content",
                    "Rephrase this text professionally for resume and make it impactful. " +
                            "Return only the final rephrased paragraph without explanation: " + summary
            );

            messages.add(message);

            requestBody.put("messages", messages);
            requestBody.put("temperature", 0.7);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            Map body = response.getBody();
            List choices = (List) body.get("choices");
            Map firstChoice = (Map) choices.get(0);
            Map messageResponse = (Map) firstChoice.get("message");

            String text = (String) messageResponse.get("content");

            return text != null ? text.trim() : "No response from Groq.";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating rephrased text: " + e.getMessage();
        }
    }
}
