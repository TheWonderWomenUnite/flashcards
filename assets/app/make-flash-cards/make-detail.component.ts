import { Component, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
import { UtilsService } from "../shared/utils.service";

@Component({
  selector: 'app-make-detail',
	templateUrl: './make-detail.component.html',
	styleUrls: ['./make-detail.component.css']  
})

export class MakeDetailComponent {
  @Input() deck: Deck;
	display = 'none';
	displayAddDeck = 'none';

  displayBar = "";
	displayHeart = "";
	isFavorite = false;
	favTitle = "";
	progressPct = 0;
	newCategory = "";
	newDeckName = "";
	userId: string;

 	constructor(private deckService: DeckService,
 			        private utilsService: UtilsService,
			        private route: ActivatedRoute,
			        private router: Router) { }

	ngOnInit() {
		this.userId = localStorage.getItem('UserId');
    if (this.deck) {
  		// this.displayBar = this.utilsService.progressBarPic(this.deck.progressBar);
  		// this.displayHeart = this.utilsService.heartPic(this.deck.favorite);
	  	this.progressPct = this.deck.progressBar;
		  this.isFavorite = this.deck.favorite;
		  this.favTitle = this.isFavorite ? "Click to remove 'FAVORITE' status" : "Click to mark this as a 'FAVORITE' deck";
    }
	}

	onAddDeck() {
  	// Show the delete modal
    this.displayAddDeck = 'block';
	}

	onAddNewDeck(answer:number) {
	    // Get rid of the modal
		this.displayAddDeck = 'none';
		console.log('adding/cloning deck for: ' + this.newCategory + ' and ' + this.newDeckName);

		// Add a new deck
		if (answer === 1) {
			const newDeck = new Deck(this.newDeckName,               
			true,
			this.newCategory,
			null,
			0,
			false,
			this.userId); 
		this.deckService.addDeck(newDeck).subscribe(
			(deck: Deck) => {
				console.log(deck);
				this.router.navigate(['./makeflashcards', 'edit', deck.deckId]);
				});
						
			// Clone a deck
			} else if (answer === 2) {
			// TBD check with lisa on what to incorp
			console.log('user wants to clone a deck');
			}

  }

	onDelete() {
  	// Show the delete modal
    this.display = 'block';
  }

  onModalResponse(answer:boolean) {
    // Get rid of the modal
		this.display = 'none';
		console.log('onModalResponse just called');
		
    if (answer) {
      // Delete the deck
      this.deckService.deleteDeck(this.deck).subscribe(
        (deck: Deck) => {
          console.log(deck);
          // Navigate back to the list
          //this.router.navigate(['./makeflashcards/', 'makelist', this.deck.userId]);            
				});
		}
  }

	onEdit() {
		console.log(this.deck.deckId);
		this.router.navigate(['./makeflashcards', 'edit', this.deck.deckId]);
	}

	onFavorite() {
	    // Toggle favorite for this deck
	    this.deck.favorite = !this.deck.favorite;
	    this.deckService.updateDeck(this.deck).subscribe(
      		(deck: Deck) => {
        		console.log(deck);
					});
			this.isFavorite = this.deck.favorite;
			this.favTitle = this.isFavorite ? "Remove 'FAVORITE' status" : "Mark this deck as a 'FAVORITE'";			
	    // this.displayHeart = this.utilsService.heartPic(this.deck.favorite);
	}
}
