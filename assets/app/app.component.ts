import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loginPrompt = 'LOG IN/SIGN UP';
  title = 'app works!';
  hideSidebar = true;

  // TBD - Q for Lisa: trying to get event emitter from signin to call this
  onLoggedIn(loginData: {status: boolean}) {
    console.log('app.component.ts called onLoggedIn')
    this.loginPrompt = loginData.status ? 'LOG OUT' : 'LOG IN/SIGN UP';
  }
  toggleSidebar() {
    console.log('this.hideSidebar is ' + this.hideSidebar);
    this.hideSidebar = !this.hideSidebar;
  }

  // DMZ added these in place of routerLinks in order to handle toggling of sidebar
  onPlayCards() {
    this.hideSidebar = true;
    this.router.navigate(['./playflashcards/']);
  }
  onMakeCards() {
    this.hideSidebar = true;
    this.router.navigate(['./makeflashcards/']);
  }
  onLogin() {

  }
}
