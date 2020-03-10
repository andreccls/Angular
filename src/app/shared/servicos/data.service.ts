import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export abstract class DataService {

    private actionUrl: string;

    constructor(private http: HttpClient) {
        this.actionUrl = `${environment.server}${environment.apiUrl}`;
    }

    buscarTodos<T>(): Observable<T> {
        return this.http.get<T>(this.actionUrl);
    }

    buscar<T>(id: number): Observable<T> {
        return this.http.get<T>(this.actionUrl + id);
    }

    adicionar<T>(itemName: string): Observable<T> {
        const toAdd = { itemName };
        return this.http.post<T>(this.actionUrl, toAdd);
    }

    alterar<T>(id: number, itemToUpdate: any): Observable<T> {
        return this.http
            .put<T>(this.actionUrl + id, itemToUpdate);
    }

    excluir<T>(id: number): Observable<T> {
        return this.http.delete<T>(this.actionUrl + id);
    }
}