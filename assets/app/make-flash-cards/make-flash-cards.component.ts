import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
	selector: 'app-make-flash-cards',
	templateUrl: './make-flash-cards.component.html',
	styleUrls: ['./make-flash-cards.component.css']

})

export class MakeFlashCardsComponent implements OnInit {
// The main component for the PlayFlashCards Module

	userName: string = '';
	gravHash: string = '';

	constructor(private route: ActivatedRoute,
							private router: Router,
							private authService: AuthService) {}

	ngOnInit() {
			// Get the user info so you can display name and gravatar
        this.getUserInfo();
        const UserId = localStorage.getItem('UserId');
				this.router.navigate(['./', 'makelist', UserId], {relativeTo: this.route});
    }

    getUserInfo() {
            this.userName = this.authService.getUserName();
            this.gravHash = this.authService.getGravHash();
        }
}

