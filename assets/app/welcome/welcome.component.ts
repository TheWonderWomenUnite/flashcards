import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/subscription';

import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
/** 
* Displays welcome message on screen, usually right after user starts app
* or user logs in or out
*/
export class WelcomeComponent implements OnInit {
    userName: string = '';
    userEmail: string = '';
    gravHash: string = '';
    userId: string = '';
    isLoggedIn = false;
    subscription: Subscription;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.subscription = this.authService.userChanged.
            subscribe((user: User) => {
                this.getUserInfo();

            });
        this.isLoggedIn = this.authService.isLoggedIn();
        if (this.isLoggedIn) {
            this.getUserInfo();

        }

    }  

    getUserInfo() {
        this.isLoggedIn = this.authService.isLoggedIn();
        if (this.isLoggedIn) {
            this.userId = localStorage.getItem('UserId');
            this.userName = this.authService.getUserName();
            this.gravHash = this.authService.getGravHash();
        }
    }

}
