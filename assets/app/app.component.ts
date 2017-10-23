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

/**
* Main entry point for the flashcard app
*/
export class AppComponent implements OnInit {
  loginPrompt = 'LOG IN/SIGN UP';
  isLoggedIn = false;
  title = 'app works!';
  hideSidebar = true;
  subscription: Subscription;
  isReady = false;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private authService: AuthService) { }

/** 
* Checks whether user is signed in and subscribes to isloggedin so 
* it can change the menu 
*/
	
    ngOnInit() {
      // Do this here so you will have the user info if they are logged in when
      // they start the app
        this.isLoggedIn = this.authService.isLoggedIn();

        this.subscription = this.authService.userChanged.
            subscribe((user: User) => {
                this.isLoggedIn = this.authService.isLoggedIn();
            });

      if (this.isLoggedIn) {
          const UserId = localStorage.getItem('UserId');
          console.log("UserId = " + UserId);
          this.authService.getUser(UserId)
              .subscribe(
              (user: User) => {
                  console.log("appcomponent :"+user);
                  this.isReady = true;
                  this.router.navigate(['/welcome']);
                });
          
      }
      else {
          this.isReady = true;
          this.router.navigate(['/welcome']);
      }
    
	
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

  /**
  * Menu button for playflashcards clicked, route to it
  */
  onPlayCards() {
    console.log('play fc clicked');
    console.log(this.route);
    this.hideSidebar = true;
    this.router.navigate(['./playflashcards/']);
  }

  /**
  * Menu button for going to 'about us', route to it
  */
  onAbout() {
    this.hideSidebar = true;
    this.router.navigate(['./about/']);
  }

   /**
  * Menu button for makeflashcards clicked, route to it
  */
  onMakeCards() {
    console.log('make fc clicked');
    console.log(this.route);
    this.hideSidebar = true;
    this.router.navigate(['./makeflashcards/']);
  }

}
