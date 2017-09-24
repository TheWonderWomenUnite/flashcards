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

  displayBar = "";
	displayHeart = "";
	isFavorite = false;
	favTitle = "";
  progressPct = 0;

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
		// TBD show modal to prompt for deck name, category and favorite status
		console.log('onAddDeck called...');
		// then either call onEdit() or use this router & require at least one card to be added?
		this.router.navigate(['./makeflashcards', 'edit', this.deck.deckId]);
	}
	onDelete() {
  	// Show the delete modal
    this.display = 'block';
  }

  private onModalResponse(answer:boolean) {
    // Get rid of the modal
    this.display = 'none';
    if answer {
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
