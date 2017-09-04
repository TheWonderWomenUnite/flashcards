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

	onSubmit() {
		console.log('running onSubmit in signUP.component.ts');

		console.log(this.myForm);
		const user = new User(
			this.myForm.value.email,
			this.myForm.value.password,
			this.myForm.value.firstName,
			this.myForm.value.lastName
			);
		console.log("About to call signup, user="+user);
		this.authService.signup(user)
			.subscribe(
				data => console.log(data),
				error => console.error(error)
				);
		this.myForm.reset();
		// This will take the user back to the signin page?
		// TBD: Ask Lisa - Should routing be in callback, similar to signin.ts?
		this.router.navigate('', {relativeTo: this.route});
	}
	onSwitchToSignin() {
		console.log('user wants to change to signin');
	    this.router.navigate(['./auth/', 'signin']);

	}
	onClose() {
		console.log('user clicked X to close');
	}

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
}