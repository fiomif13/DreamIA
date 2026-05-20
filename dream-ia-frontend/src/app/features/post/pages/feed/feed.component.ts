import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-feed',
  standalone: true, 
  imports: [CommonModule, PostCardComponent], 
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadPosts();

    this.postService.refresh$.subscribe(() => {
      this.loadPosts();
    });
  }

  loadPosts() {
    this.postService.getFeed()
      .subscribe({
        next: (data) => {
          this.posts = data;
          console.log(data);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}