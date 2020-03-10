import { Usuario } from './../models/usuario';
import { Post } from './../models/post';
import { Meta } from './../models/meta';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private actionUrl: string;
  private handleError: any;

    constructor(private httpClient: HttpClient) {
        this.actionUrl = `${environment.server}${environment.apiUrl}users`;
    }

    getUsers(): Observable<Meta<Usuario>> {
      return this.httpClient.get<Meta<Usuario>>(this.actionUrl)
        .pipe(
          retry(2),
          catchError(this.handleError))
    }

    getUser(id: string): Observable<Usuario> {
      return this.httpClient.get<Meta<Usuario>>(`${this.actionUrl}/${id}`)
      .pipe(retry(2),map (x => { return x.result }
      ), catchError(this.handleError));
    }
}
