import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
	selector: 'app-home',
  	templateUrl: './home.component.html',
  	styleUrls: ['./home.component.css']
	})

export class HomeComponent implements OnInit {

	constructor(private router: Router, private authService: AuthService) { }

  	ngOnInit() {
  	}

	onLogin() {
      console.log ("Hi from onLogin, this.authService.loggedIn = "+this.authService.loggedIn);
    	this.authService.login();
  	}

  	onLogout() {
      console.log ("Hi from onLogOut, this.authService.loggedIn = "+this.authService.loggedIn);
    	this.authService.logout(); 

  	}

}
