import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'; // for .map
import { Observable } from "rxjs";
import { ErrorService } from '../errors/error.service';

import { Md5 } from 'ts-md5/dist/md5';

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

	getUserName() {
		// Call this method in the callback for getUser to retrieve the 
		// string that is the user's name
		return this.currentUser.firstName+' '+this.currentUser.lastName;
	}

	getUserEmail() {
		return this.currentUser.email;
	}

	getGravHash(): string {
        const userEmail = this.currentUser.email.trim().toLowerCase();
	    return Md5.hashStr(userEmail).toString();
	}

   getUser(userId: string) {
    	// Call this method with a user Id to fill the currentUser Object
        console.log("getUser: Going to call get with userId: "+userId);
        return this.http.get('http://localhost:3000/user/' + userId)
            .map((response: Response) => {
                const userObj = response.json().obj;
                const newUser = new User(userObj.email, 
					userObj.password,
					userObj.firstName,
					userObj.lastName);
                this.currentUser = newUser;
                console.log("getUser: currentUser is "+this.currentUser);
                return this.currentUser;
            });
            /*
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
            */        
    }

	isLoggedIn() {
		return localStorage.getItem('token') != null;
	}
}
