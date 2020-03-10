import { Meta } from './../models/meta';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { retry, catchError } from 'rxjs/operators';
import { Comentario } from '../models/comentario';

@Injectable({
	providedIn: 'root'
})
export class CommentService {

	private actionUrl: string;
	public handleError: any;

	constructor(private httpClient: HttpClient) {
		this.actionUrl = `${environment.server}${environment.apiUrl}comments`;
	}

	getCommentsByPost(idPost: string): Observable<Meta<Comentario>> {
		return this.httpClient.get<Meta<Comentario>>(`${this.actionUrl}?post_id=${idPost}`)
		.pipe(
			retry(2),
			catchError(this.handleError));
	}

	saveComment(comment: Comentario): Observable<Comentario> {
		console.log(JSON.stringify(comment));
		return this.httpClient.post<Comentario>(this.actionUrl, JSON.stringify(comment))
		  .pipe(
			retry(2),
			catchError(this.handleError)
		  )
	  }
}
