import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { CreatePost } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'https://dreamia-1.onrender.com/api/posts';

  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  constructor(private http: HttpClient) {}

  getFeed() {
    return this.http.get<Post[]>(`${this.apiUrl}/feed`);
  }

  publish(post: CreatePost) {
    return this.http.post(`${this.apiUrl}`, post);
  }

  notifyRefresh() {
    this.refreshSubject.next();
  }
}
