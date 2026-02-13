package com.resumeBuilder;


import com.resumeBuilder.model.Resume;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ResumeBuilderApplication {


	@Value("${groq.api.key}")
	private String apiKey;

	@Value("${test.value}")
	private  String test;
	public static void main(String[] args) {
		SpringApplication.run(ResumeBuilderApplication.class, args);

		Resume t = new Resume();
		t.setEmail("Sullivan");

		System.out.println(t.getEmail());

	}
	@PostConstruct
	public void check() {
		System.out.println("TEST VALUE = " + test);
	}
}
