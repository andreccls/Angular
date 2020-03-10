import { Meta } from './../models/meta';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PostService {

	private actionUrl: string;
	private handleError: any;

	constructor(private httpClient: HttpClient) {
		this.actionUrl = `${environment.server}${environment.apiUrl}posts`;
	}


	getPosts(): Observable<Meta<Post>> {
		return this.httpClient.get<Meta<Post>>(this.actionUrl)
			.pipe(
				retry(2),
				catchError(this.handleError))
	}

	getPostDetail(id: string): Observable<Post> {
		return this.httpClient.get<Meta<Post>>(`${this.actionUrl}/${id}`)
			.pipe(map(x => { return x.result }),
				retry(2),
				catchError(this.handleError));
	}


	savePost(post: Post): Observable<Post> {
		return this.httpClient.post<Post>(this.actionUrl, JSON.stringify(post))
		  .pipe(
			retry(2),
			catchError(this.handleError)
		  )
	  }
}
