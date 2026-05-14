package com.dreamia.dream_ia_backend.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.dreamia.dream_ia_backend.dto.OpcionesCuentoDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

@Service
public class IAService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private Client client;
    private final ObjectMapper mapper = new ObjectMapper();

    // Inicializamos el cliente una sola vez al arrancar
    @PostConstruct
    public void init() {
        this.client = Client.builder()
            .apiKey(apiKey.trim())
            .build();
    }

    public OpcionesCuentoDTO generarOpciones(String dream) {
        String prompt = """
            Responde estrictamente en formato JSON con la siguiente estructura:
            {
              "inicios": [],
              "desarrollos": [],
              "finales": []
            }
            Genera 3 opciones de cada uno basadas en este sueño:
            """ + dream;

        try {
            // El SDK maneja la URL, la versión y los headers por ti
            GenerateContentResponse response = client.models.generateContent(
                "gemini-2.5-flash",
                prompt,
                null
            );

            // El SDK ya te da el texto directo en .text()
            String rawText = response.text();

            // Limpieza básica por si la IA ignora la instrucción de "SOLO JSON"
            String cleanJson = rawText.replaceAll("(?s)```json\\s*|```", "").trim();

            return mapper.readValue(cleanJson, OpcionesCuentoDTO.class);

        } catch (Exception e) {
            throw new RuntimeException("Error con el SDK de Gemini: " + e.getMessage(), e);
        }
    }
}