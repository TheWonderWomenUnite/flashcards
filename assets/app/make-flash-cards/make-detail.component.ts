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

 	constructor(private deckService: DeckService,
 			        private utilsService: UtilsService,
			        private route: ActivatedRoute,
			        private router: Router) { }

	ngOnInit() {
		// Go get the progress bar img string
		this.displayBar = this.utilsService.progressBarPic(this.deck.progressBar);
		this.displayHeart = this.utilsService.heartPic(this.deck.favorite);
		this.progressPct = this.deck.progressBar;
		this.isFavorite = this.deck.favorite;
		this.favTitle = this.isFavorite ? "Click to remove 'FAVORITE' status" : "Click to mark this as a 'FAVORITE' deck";
	}

	onAddDeck() {
  	// Show the delete modal
    this.displayAddDeck = 'block';
	}

	private onAddNewDeck(answer:boolean) {
    // Get rid of the modal
		this.displayAddDeck = 'none';
		console.log('adding deck for: ' + this.newCategory + ' and ' this.newDeckName)
    if answer {
			// TBD ask Lisa for help here
      // Add general info for new deck
      this.deckService.addDeck(this.deck).subscribe(
        (deck: Deck) => {
          console.log(deck);
				// then either call onEdit() or something close to this router & require at least one card to be added?
				// TBD think this will need same url as onEdit once that works...
				//this.router.navigate(['./makeflashcards', 'edit', this.deck.deckId]);
			});
    }
  }

	onDelete() {
  	// Show the delete modal
    this.display = 'block';
  }

  private onModalResponse(answer) {
    // Get rid of the modal
		this.display = 'none';
		
		// Create new deck
    if (answer === 1) {
      // Delete the deck
      this.deckService.deleteDeck(this.deck).subscribe(
        (deck: Deck) => {
          console.log(deck);
          // Navigate back to the list
          //this.router.navigate(['./makeflashcards/', 'makelist', this.deck.userId]);            
				});
				
		// Clone a deck
    } else if (answer === 2) {
			console.log('user wants to clone a deck');
		}
  }

	onEdit() {
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
	    this.displayHeart = this.utilsService.heartPic(this.deck.favorite);
	}
}
