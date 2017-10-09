import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loginPrompt = 'LOG IN/SIGN UP';
  isLoggedIn = false;
  title = 'app works!';
  hideSidebar = true;
  userName: string = '';
	gravHash: string = '';


	constructor(private route: ActivatedRoute,
    private router: Router,
      private authService: AuthService) { }

  ngOnInit() {
    console.log("status is " + this.authService.isLoggedIn());
    this.isLoggedIn = this.authService.isLoggedIn();  

    // TBD ask lisa about this - for gravitar in menubar??
    if (this.isLoggedIn) {
        const UserId = localStorage.getItem('UserId');
        console.log("UserId = "+UserId);

        // Get the user info so you can display name and gravatar
        this.authService.getUser(UserId)
            .subscribe(
                (user: User) => {
                    console.log(user);
                    this.userName = this.authService.getUserName();
                    this.gravHash = this.authService.getGravHash();
                }
            );
    }
  }


  // TBD - Q for Lisa: trying to get event emitter from signin to call this
  onLoggedIn(loginData: {status: boolean}) {
    console.log('app.component.ts called onLoggedIn')
    this.loginPrompt = loginData.status ? 'LOG OUT' : 'LOG IN/SIGN UP';
  }
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
  onLogin() {

  }
}
