import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { DeckListComponent } from './deck-list.component';

@Component({
  selector: 'app-play-flash-cards',
  templateUrl: './play-flash-cards.component.html',
  styleUrls: ['./play-flash-cards.component.css']
})

// Ask Lisa: should this be ngOnInit or OnInit? It's just OnInit in mfc
export class PlayFlashCardsComponent implements ngOnInit {
	// The main component for the PlayFlashCards Module
	userName: string = '';
	userEmail: string = '';
  gravHash: string = '';

	constructor(private route: ActivatedRoute,
							private router: Router,
							private authService: AuthService) { }

	ngOnInit() {
//TBD if component already init, it's not working when called again
			const UserId = localStorage.getItem('UserId');
			console.log('in pfc ngoninit');
			console.log("UserId = "+UserId);

			this.authService.getUser(UserId)
					.subscribe(
							(user: User) => {
									console.log(user);
									this.userName = this.authService.getUserName();
									this.gravHash = this.authService.getGravHash();
									// Now route to the deck-list
									// this.router.navigate(['./', 'decklist', UserId], {relativeTo: this.route});
									console.log(this.route);

									// DMZ tried to use <app-deck-list> in p-f-c.html instead of <router-outlet>
									// & thies navigate to work around problem if user is already IN play cards 
									// and they clicked on play cards in menu -- something not working when I tried it this way, don't know what
									this.router.navigate(['./', 'decklist', UserId], {relativeTo: this.route});
							}
					);
	}  
}
