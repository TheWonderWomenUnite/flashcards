import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loginPrompt = 'LOG IN/SIGN UP';
  title = 'app works!';

  // TBD/ Q for Lisa: trying to get event emitter from signin to call this
  onLoggedIn(loginData: {status: boolean}) {
    console.log('app.component.ts called onLoggedIn')
    this.loginPrompt = loginData.status ? 'LOG OUT' : 'LOG IN/SIGN UP';
  }


}
