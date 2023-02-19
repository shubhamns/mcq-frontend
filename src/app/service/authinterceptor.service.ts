import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';

const api_path = 'http://localhost:5000/api';

@Injectable({
	providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

	constructor(private router: Router, private auth: GlobalService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add auth header with jwt if account is logged in and request is to the api url
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.auth.getToken()}`
			}
		});
		// console.log(request.url)
		return next.handle(request);
	}



	// intercept(req: HttpRequest<any>,
	// 	next: HttpHandler): any {

	// 	const idToken = localStorage.getItem("token");
	// 	if (idToken) {	//If theres a token, send it in every request
	// 		console.log("intercepted: " + req.url);
	// 		const cloned = req.clone({
	// 			headers: req.headers.set('Authorization','Bearer ' + idToken)
	// 		});
	// 		console.log("intercepted: " + req.url);
	// 		return next.handle(cloned);
	// 	}	//If theres no token and we access a private url, redirect to login page
	// 	else if (req.url == (api_path + "/profile")
	// 		|| (req.url == (api_path + "/user") && req.method == "GET")
	// 		|| req.url == (api_path + "/reduce/advice")) {
	// 			//console.log("intercepted: " + req.url);
	// 			this.router.navigate(['authenticate/login']);
	// 			//return next.handle(req);
	// 	} 
	// 	else {
	// 		//console.log("intercepted: " + req.url);
	// 		return next.handle(req);
	// 	}
	// }
}

