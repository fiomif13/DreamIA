package com.dreamia.dream_ia_backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "stories")
public class Post {

    @Id // Identificador unico
    @GeneratedValue(strategy = GenerationType.UUID) // automatiza la generacion del id
    private UUID id;
    private String nameUser;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;
    private LocalDateTime createdAt;

    @PrePersist // significa: ejecuta este método ANTES de guardar en la base de datos
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
