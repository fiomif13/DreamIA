package com.dreamia.dream_ia_backend.service;
import org.springframework.stereotype.Service;
import com.dreamia.dream_ia_backend.repository.PostRepository;
import com.dreamia.dream_ia_backend.model.Post;
import java.util.List;

@Service
public class PostService {

    //private: Solo accesible dentro de esta clase
    //
    //final: No va a cambiar (siempre será el mismo repository)
    //
    //PostRepository: El tipo de dato (la interfaz anterior)
    //
    //Traducción: "Voy a tener una variable para hablar con la base de datos"
    private final PostRepository postRepository;

    // constructor
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // Llama al repository
    //Pide todos los posts
    //Los devuelve
    public List<Post> getFeed() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post save(Post post) {
        
        if (post.getNameUser() == null || post.getNameUser().trim().isEmpty()
            || post.getTitle() == null || post.getTitle().trim().isEmpty()
            || post.getContent() == null || post.getContent().trim().isEmpty()) {
                throw new RuntimeException("Campos obligatorios");
            }

        return postRepository.save(post);
    }
}
