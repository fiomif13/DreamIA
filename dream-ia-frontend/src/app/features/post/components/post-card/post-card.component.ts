import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';

@Component({ // le dice a Angular que esta clase será un componente
  selector: 'app-post-card', // Nombre de la etiqueta HTML del componente
  standalone: true, // Indica que el componente funciona solo
  // sin necesidad de un módulo (NgModule)

  imports: [CommonModule],  // Módulos que este componente puede usar
  templateUrl: './post-card.component.html',  // Archivo HTML del componente
  styleUrls: ['./post-card.component.css'] // Archivo CSS del componente
  
})
export class PostCardComponent { // Clase principal del componente
  @Input() post!: Post;
}