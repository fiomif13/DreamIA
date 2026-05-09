import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(
    private postService: PostService,
    private http: HttpClient
  ) {}

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

  dream = '';

  respuesta: any = null;

  messages: any[] = [];

  publish() {

    this.errorMessage = '';

    // Obtener valores con trim (sin optional chaining)
    const nameUser = this.author?.trim() || '';
    const title = this.title?.trim() || '';
    const content = this.content?.trim() || '';

    const post = {
      nameUser: nameUser,
      title: title,
      content: content
    };

    if (!post.nameUser || post.nameUser.length === 0 || 
        !post.title || post.title.length === 0 || 
        !post.content || post.content.length === 0) {
      this.errorMessage = 'Por favor completa todos los campos';
      console.log('Validación fallida:', { nameUser, title, content });
      return;
    }

    this.postService.publish(post)
      .subscribe({
        next: () => {
          
          this.postService.notifyRefresh();
          
          // Limpiar formulario
          this.author = '';
          this.title = '';
          this.content = '';
          this.errorMessage = '';
          
          // Cerrar sidebar
          this.rightOpen = false;
        },
        error: () => {
          this.errorMessage = 'Error al publicar. Intenta de nuevo.';
        }
      });
  }

  generarOpciones() {

    if (!this.dream.trim()) return;

    const userMessage = this.dream;

    // guardar mensaje usuario
    this.messages.push({
      type: 'user',
      text: userMessage
    });

    // limpiar input
    this.dream = '';

    this.http.post<any>(
      'http://localhost:8080/api/posts/opciones',
      { dream: userMessage }
    ).subscribe({

      next: (res) => {

        // guardar respuesta IA
        this.messages.push({
          type: 'ia',
          data: res
        });

      },

      error: () => {
        this.messages.push({
          type: 'ia',
          data: {
            inicios: ['La IA está ocupada ahora mismo 😭'],
            desarrollos: [],
            finales: []
          }
        });
      }

    });

  }
}