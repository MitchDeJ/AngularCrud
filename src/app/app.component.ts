import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Post } from './post';
import {from, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularcrud';
  readonly URL = 'http://symfonycrud.test/';
  posts: Observable<Post[]>;
  requestStatus: any;

  constructor(private http: HttpClient) {}

  getPosts(): void {
    this.posts = this.http.get<Post[]>(this.URL + 'post/getall');
    console.log(this.posts);
  }

  async addPost(title: string, content: string, author: string): Promise<void> {
    const data: Post = {
      id: null,
      title,
      content,
      author
    };
    this.requestStatus = await this.http.post(this.URL + 'post/add', data).toPromise();
    console.log(this.requestStatus);
    this.getPosts(); // refresh
  }

  async updatePost(id: number, title: string, content: string, author: string): Promise<void> {
    const data: Post = {
      id,
      title,
      content,
      author
    };
    this.requestStatus = await this.http.put(this.URL + 'post/update/' + id, data).toPromise();
    console.log(this.requestStatus);
    this.getPosts(); // refresh
  }

  async deletePost(id: string): Promise<void> {
    this.requestStatus = await this.http.delete(this.URL + 'post/delete/' + id).toPromise();
    console.log(this.requestStatus);
    this.getPosts(); // refresh
  }

  ngOnInit(): void { // load posts on page load
    this.getPosts();
  }

}
