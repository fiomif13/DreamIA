package com.dreamia.dream_ia_backend.controller;

import org.springframework.web.bind.annotation.*;
import com.dreamia.dream_ia_backend.service.PostService;

import io.swagger.v3.oas.annotations.Operation;

import com.dreamia.dream_ia_backend.model.Post;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
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
}


