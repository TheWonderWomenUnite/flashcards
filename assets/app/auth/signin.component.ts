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
		console.log('running onSubmit in signin.component.ts');
		const user = new User(this.myForm.value.email, this.myForm.value.password);
		this.authService.signin(user) 
			.subscribe(
				data => {
					localStorage.setItem('token', data.token);
					localStorage.setItem('UserId', data.userId);
					// After a successful login maybe it should go 
					// To the play flashcards screen?
					this.router.navigateByUrl('/playflashcards');
				},
				error => console.error(error)
				);

		this.myForm.reset();
	}
	onSwitchToSignup() {
		console.log('user wants to change to signup');

		// LMC: This jsut needed a tweak
	    this.router.navigate(['./auth/', 'signup']);
		// this.router.navigate(['./', 'signup'], {relativeTo: this.route});		
	}
	onClose() {
		console.log('user clicked X to close');
	    // this.router.navigate(['./auth/', 'signup']);

		//this.router.navigateByUrl('/');
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