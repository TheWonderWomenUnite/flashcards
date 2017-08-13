import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'; // for .map
import { Observable } from "rxjs";
import { ErrorService } from '../errors/error.service';

import { User } from '../models/user.model';

@Injectable()
export class AuthService {
	private currentUser: User;

	constructor(private http: Http,
				private errorService: ErrorService) {}

	signup(user: User) {
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
		console.log("about to return with post"+user);
		console.log("Body = "+body);
		return this.http.post('http://localhost:3000/user', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				console.log("Going to handleerror");
            	this.errorService.handleError(error.json());
            	return Observable.throw(error.json());
            });	
	}

	signin(user: User) {
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});

		return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => {
            	this.errorService.handleError(error.json());
            	return Observable.throw(error.json());
            });	
	}

	logout() {
		localStorage.clear();
	}

	getUserInfo() {
		const userId = localStorage.getItem('UserId');
		if (userId) {
			this.callUserGet(userId)
            .subscribe(
                (user: User) => {
                    this.currentUser = user;
                });

			}
	}

	callUserGet(userId: string) {

        // Call this method with a user Id to get all of the decks
        // that belong to a user
        console.log("Going to call get with userId: "+userId);
        return this.http.get('http://localhost:3000/userInfo/' + userId)
            .map((response: Response) => {
                const user = response.json().obj;
                foundUser = new User(user.email, 
					user.password,
					user.firstName,
					user.lastName);
               	return foundUser;
            })
            .catch((error: Response) => {
                console.log("Hi from the catch block for callUserGet");
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    	}

	isLoggedIn() {
		return localStorage.getItem('token') != null;
	}
}