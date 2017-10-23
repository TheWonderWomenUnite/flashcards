import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'; // for .map
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';

import { ErrorService } from '../errors/error.service';
import { Md5 } from 'ts-md5/dist/md5';

import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    private server = "http://localhost:3000";
    //private server = "https://awesome-flashcards.herokuapp.com";

	private currentUser: User;   
	userChanged = new Subject<User>();

	constructor(private http: Http,
				private errorService: ErrorService) {}

	signup(user: User) {
		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.server+'/user', body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => {
            	this.errorService.handleError(error.json());
            	return Observable.throw(error.json());
            });	
	}

	signin(user: User) {

		const body = JSON.stringify(user);
		const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post(this.server+'/user/signin', body, {headers: headers})
			    .map((response: Response) => {
				const responseObj = response.json();
				localStorage.setItem('token', responseObj.token);
				localStorage.setItem('UserId', responseObj.user._id);
				const newUser = new User(
					responseObj.user.email, 
					responseObj.user.password,
					responseObj.user.firstName,
					responseObj.user.lastName);
                this.currentUser = newUser;
                this.userChanged.next(this.currentUser);
				return this.currentUser;
                
			})
			.catch((error: Response) => {
            	this.errorService.handleError(error.json());
            	return Observable.throw(error.json());
            });
	}

	logout() {
		localStorage.clear();
		const newUser = new User('','','','');
        this.currentUser = newUser;
		this.userChanged.next(this.currentUser);
	}

	getUserName() {
		// Call this method in the callback for getUser to retrieve the 
		// string that is the user's name
        if (this.isLoggedIn()) {
            console.log("getUserName: userName :"+this.currentUser.firstName);
			    return this.currentUser.firstName+' '+this.currentUser.lastName;
			    }
			else 
			    {
				  return null;
			    }
	}

	getUserEmail() {
		if (this.isLoggedIn()) {
			return this.currentUser.email;
		}
		else 
		{
			return null;
		}
	}

	getGravHash(): string {
        const userEmail = this.currentUser.email.trim().toLowerCase();
	    return Md5.hashStr(userEmail).toString();
	}

   getUser(userId: string) {
    	// Call this method with a user Id to fill the currentUser Object
        console.log("getUser: Going to call get with userId: "+userId);
        return this.http.get(this.server + '/user/' + userId)
            .map((response: Response) => {
                const userObj = response.json().obj;
                const newUser = new User(
					        userObj.email, 
					        userObj.password,
					        userObj.firstName,
					        userObj.lastName);
                this.currentUser = newUser;
                console.log("getUser:Just got user, firstname = " + this.currentUser.firstName + ' ' + this.currentUser.lastName);
                return this.currentUser;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
                    
    }

	isLoggedIn() {
		const userId = localStorage.getItem('UserId');
		return localStorage.getItem('UserId') != null;
	}
}
