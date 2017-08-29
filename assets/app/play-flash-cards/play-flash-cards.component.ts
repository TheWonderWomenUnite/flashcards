import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { DeckListComponent } from './deck-list.component';

@Component({
  selector: 'app-play-flash-cards',
  templateUrl: './play-flash-cards.component.html',
  styleUrls: ['./play-flash-cards.component.css']
})

export class PlayFlashCardsComponent implements ngOnInit {
// The main component for the PlayFlashCards Module
	userName: string = '';
	userEmail: string = '';
    gravHash: string = '';

  	constructor(private route: ActivatedRoute,
  				private router: Router,
  			  	private authService: AuthService) { }

  	ngOnInit() {

		const UserId = localStorage.getItem('UserId');

		console.log("UserId = "+UserId);

       	this.authService.getUser(UserId)
            .subscribe(
                (user: User) => {
                    console.log(user);
                    this.userName = this.authService.getUserName();
 				    this.gravHash = this.authService.getGravHash();
 				    // Now route to the deck-list
		    		this.router.navigate(['./', 'decklist', UserId], {relativeTo: this.route});
                }
            );
		}  
}
