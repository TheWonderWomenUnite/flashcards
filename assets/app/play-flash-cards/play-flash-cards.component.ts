import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

import { AuthService } from '../auth/auth.service';
import { DeckListComponent } from './deck-list.component';

import { User } from '../models/user.model';

@Component({
  selector: 'app-play-flash-cards',
  templateUrl: './play-flash-cards.component.html',
  styleUrls: ['./play-flash-cards.component.css']
})

export class PlayFlashCardsComponent implements OnInit {
	// The main component for the PlayFlashCards Module
	userName: string = '';
	userEmail: string = '';
	gravHash: string = '';
	userId: string = '';
	isLoggedIn = false;
	subscription: Subscription;

	constructor(private route: ActivatedRoute,
							private router: Router,
							private authService: AuthService) { }

	ngOnInit() {
	//TBD if component already init, it's not working when called again

		this.subscription = this.authService.userChanged.
			subscribe((user: User) => {
				this.getUserInfo();

			});
		this.isLoggedIn = this.authService.isLoggedIn();
		if (this.isLoggedIn) {
			this.getUserInfo();
			this.router.navigate(['./', 'decklist', this.userId], {relativeTo: this.route});
		}
		else
		{
			this.router.navigate(['./', 'decklist'], {relativeTo: this.route});
		}


	}  
	getUserInfo() {
		this.isLoggedIn = this.authService.isLoggedIn();
		if (this.isLoggedIn) {
			this.userId = localStorage.getItem('UserId');
			this.userName = this.authService.getUserName();
			this.gravHash = this.authService.getGravHash();
		}
	}
}
