import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './features/post/pages/feed/feed.component';
import { FormsModule } from '@angular/forms';
import { PostService } from './features/post/services/post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FeedComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(private postService: PostService) {}

  leftOpen = false;
  rightOpen = false;

  openLeft() {
    this.leftOpen = true;
  }

  openRight() {
    this.rightOpen = true;
  }

  closeLeft() {
    this.leftOpen = false;
  }

  closeRight() {
    this.rightOpen = false;
  }

  author = '';
  title = '';
  content = '';
  errorMessage = '';

  publish() {
    const post = {
      nameUser: this.author?.trim(),
      title: this.title?.trim(),
      content: this.content?.trim()
    };

    if (!post.nameUser || !post.title || !post.content) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.errorMessage = '';

    this.postService.publish(post)
      .subscribe({
        next: () => {
          // 🔥 IMPORTANTE: Notificar SOLO después de que la publicación fue exitosa
          this.postService.notifyRefresh();
          
          // Limpiar formulario
          this.author = '';
          this.title = '';
          this.content = '';
          
          // Cerrar sidebar
          this.rightOpen = false;
          
          // Limpiar mensaje de error por si acaso
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error al publicar:', error);
          this.errorMessage = 'Error al publicar. Intenta de nuevo.';
        }
      });
  }
}