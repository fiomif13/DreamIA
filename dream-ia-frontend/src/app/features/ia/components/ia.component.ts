import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ia',
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.css']
})
export class IaComponent {

  dream = '';

  respuesta: any = null;

  constructor(private http: HttpClient) {}

  generarOpciones() {

    if (!this.dream.trim()) return;

    this.http.post<any>(
      'http://localhost:8080/api/posts/opciones',
      { dream: this.dream }
    ).subscribe(res => {

      this.respuesta = res;

    });

  }

}