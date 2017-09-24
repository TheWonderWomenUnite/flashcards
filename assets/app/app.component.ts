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

	constructor(private route: ActivatedRoute,
    private router: Router,
      private authService: AuthService) { }

  ngOnInit() {
    console.log("status is " + this.authService.isLoggedIn());
    this.isLoggedIn = this.authService.isLoggedIn();  
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
