import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const authReq = req.clone({
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				Authorization: `Bearer ${environment.apiKey}`
			})
		});
		return next.handle(authReq);
	}
}
