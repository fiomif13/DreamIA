package com.dreamia.dream_ia_backend.controller;

import org.springframework.web.bind.annotation.*;

import com.dreamia.dream_ia_backend.service.IAService;
import com.dreamia.dream_ia_backend.service.PostService;

import io.swagger.v3.oas.annotations.Operation;

import com.dreamia.dream_ia_backend.dto.OpcionesCuentoDTO;
import com.dreamia.dream_ia_backend.model.Post;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {
    // clase PostService que creé en el archivo PostService
    // Esta clase tiene una variable llamada postService que guardará un objeto tipo PostService
    // postService es una variable que guarda un objeto tipo PostService
    private final PostService postService;
    private final IAService iaService;

    public PostController(PostService postService, IAService geminiService) {
        this.postService = postService;
        this.iaService = geminiService;
    }

    @Operation(summary = "Obtener todos los cuentos publicados segun orden de fechas")
    @GetMapping("/feed")
    public List<Post> getFeed() {
        return postService.getFeed();
    }

    @Operation(summary = "Crear un cuento")
    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.save(post);
    }

    @PostMapping("/opciones")
    public OpcionesCuentoDTO generar(@RequestBody Map<String, String> body) {
        return iaService.generarOpciones(body.get("dream"));
    }
}



