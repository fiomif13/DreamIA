import { Component, ChangeDetectorRef, NgZone, ViewEncapsulation, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None
})
export class App {

  constructor(
    private postService: PostService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  @ViewChild('sidebarLeft', { static: false }) sidebarLeft!: ElementRef;
  @ViewChild('sidebarRight', { static: false }) sidebarRight!: ElementRef;

  leftOpen = false;
  rightOpen = false;
  private resizing: 'left' | 'right' | null = null;
  private startX = 0;
  private startWidth = 0;

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
    this.author = '';
    this.title = '';
    this.content = '';
    this.errorMessage = '';
  }

  author = '';
  title = '';
  content = '';
  errorMessage = '';

  dream = '';

  respuesta: any = null;

  messages: any[] = [];

  publish() {
    const nameUser = this.author ? this.author.trim() : '';
    const title = this.title ? this.title.trim() : '';
    const content = this.content ? this.content.trim() : '';

    if (!nameUser || !title || !content) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.errorMessage = '';

    const post = {
      nameUser: nameUser,
      title: title,
      content: content
    };

    this.postService.publish(post)
      .subscribe({
        next: (res) => {
          this.zone.run(() => {
            console.log('Publicación exitosa', res);
            this.postService.notifyRefresh();
            this.author = '';
            this.title = '';
            this.content = '';
            this.errorMessage = '';
            this.rightOpen = false;
            this.cdr.detectChanges();
          });
        },
        error: (err) => {
          this.zone.run(() => {
            console.error('Error en publicación', err);
            this.errorMessage = 'Error al publicar. Intenta de nuevo.';
            this.cdr.detectChanges();
          });
        }
      });
  }

  generarOpciones() {
    if (!this.dream.trim()) return;

    const userMessage = this.dream;

    this.messages.push({
      type: 'user',
      text: userMessage
    });

    this.messages.push({
      type: 'ia',
      data: {
        loading: true,
        inicios: [],
        desarrollos: [],
        finales: []
      }
    });

    this.dream = '';

    this.http.post<any>(
      'http://localhost:8080/api/posts/opciones',
      { dream: userMessage }
    ).subscribe({
      next: (res) => {
        this.messages = this.messages.filter(m => !m.data?.loading);
        this.messages.push({
          type: 'ia',
          data: res
        });
      },
      error: () => {
        this.messages = this.messages.filter(m => !m.data?.loading);
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

  onResizeStart(event: MouseEvent, side: 'left' | 'right') {
    this.resizing = side;
    this.startX = event.clientX;
    const el = side === 'left' ? this.sidebarLeft?.nativeElement : this.sidebarRight?.nativeElement;
    this.startWidth = el?.offsetWidth || 400;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onResize(event: MouseEvent) {
    if (!this.resizing) return;
    const delta = event.clientX - this.startX;
    let newWidth = this.resizing === 'left'
      ? this.startWidth + delta
      : this.startWidth - delta;
    newWidth = Math.max(280, Math.min(800, newWidth));
    const el = this.resizing === 'left' ? this.sidebarLeft?.nativeElement : this.sidebarRight?.nativeElement;
    if (el) {
      el.style.width = newWidth + 'px';
    }
  }

  @HostListener('document:mouseup')
  onResizeEnd() {
    this.resizing = null;
  }
}
