import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
	myForm: FormGroup;

	constructor(private authService: AuthService, private router: Router) {} 

	onSubmit() {
		// console.log(this.myForm);
		const user = new User(this.myForm.value.email, this.myForm.value.password);
		this.authService.signin(user) 
			.subscribe(
				data => {
					localStorage.setItem('token', data.token);
					localStorage.setItem('UserId', data.userId);
					// After a successful login go back to the main route (messages page)
					this.router.navigateByUrl('/');
				},
				error => console.error(error)
				);
		this.myForm.reset();
	}

	ngOnInit() {
		this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
			password: new FormControl(null, Validators.required)			
		});
	}
}