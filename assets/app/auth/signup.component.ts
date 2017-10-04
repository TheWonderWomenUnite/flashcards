import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
	  myForm: FormGroup;

	  constructor(private authService: AuthService, private router: Router) {} 

  	ngOnInit() {
		  this.myForm = new FormGroup({
			  firstName: new FormControl(null, Validators.required),
			  lastName: new FormControl(null, Validators.required),
              email: new FormControl(null, [
                  Validators.required,
                  Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
              ]),
			  password: new FormControl(null, Validators.required)			
		  });
	  }

	  onSubmit() {
		  console.log(this.myForm);
		  const user = new User(
			  this.myForm.value.email,
			  this.myForm.value.password,
			  this.myForm.value.firstName,
			  this.myForm.value.lastName
			  );
		  this.authService.signup(user)
			  .subscribe(
				  data => console.log(data),
				  error => console.error(error)
				  );
		  this.myForm.reset();
		  // This will take the user back to the signin page?
		  this.router.navigate('', {relativeTo: this.route});
	  }

	  onSwitchToSignin() {
	      this.router.navigate(['./auth/', 'signin']);
 	  }

	onClose() {
		console.log('user clicked X to close');
	}


}
