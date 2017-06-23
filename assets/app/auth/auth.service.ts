import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'; // for .map
import { Observable } from "rxjs";

import { User } from './user.model';

@Injectable()
export class AuthService {

	constructor(private http: Http) {}

	signup(user: User) {
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		console.log("about to return with post"+user);
		console.log("Body = "+body);
		return this.http.post('http://localhost:3000/user', body, {headers: headers})
			.map((response: Response) => {
				console.log("hi from the map callback, response = "+response);
				response.json();

			});

			//.catch((error: Response) => Observable.throw(error.json().error || 'Server Error'));
				
	}

	signin(user: User) {
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});

		return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json().error || 'Server Error'));
				
	}

	logout() {
		localStorage.clear();
	}

	isLoggedIn() {
		return localStorage.getItem('token') != null;
	}
}