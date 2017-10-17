import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

import { User } from './models/user.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loginPrompt = 'LOG IN/SIGN UP';
  isLoggedIn = false;
  title = 'app works!';
  hideSidebar = true;
<<<<<<< HEAD
  subscription: Subscription;
=======
  userName: string = '';
	gravHash: string = '';

>>>>>>> edit_cards

	constructor(private route: ActivatedRoute,
				private router: Router,
				private authService: AuthService) { }

  ngOnInit() {

    this.isLoggedIn = this.authService.isLoggedIn();
	this.subscription = this.authService.userChanged.
		subscribe((user: User) => {
			this.isLoggedIn = this.authService.isLoggedIn();
        });
	
  }


  // TBD - Q for Lisa: trying to get event emitter from signin to call this
  //onLoggedIn(loginData: {status: boolean}) {
  //  console.log('app.component.ts called onLoggedIn')
  //  this.loginPrompt = loginData.status ? 'LOG OUT' : 'LOG IN/SIGN UP';
  //}
  toggleSidebar() {
    console.log('this.hideSidebar is ' + this.hideSidebar);
    this.hideSidebar = !this.hideSidebar;
  }

  onPlayCards() {
    console.log('play fc clicked');
    console.log(this.route);
    this.hideSidebar = true;
    this.router.navigate(['./playflashcards/']);
  }
  onMakeCards() {
    console.log('make fc clicked');
    console.log(this.route);
    this.hideSidebar = true;
    this.router.navigate(['./makeflashcards/']);
  }

}
