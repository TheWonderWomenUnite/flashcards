import { Component, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
import { UtilsService } from "../shared/utils.service";

@Component({
  selector: 'app-make-detail',
  templateUrl: './make-detail.component.html'    
})

export class MakeDetailComponent {
  @Input() deck: Deck;
  display = 'none';

  displayBar = "";
	displayHeart = "";

 	constructor(private deckService: DeckService,
 			        private utilsService: UtilsService,
			        private route: ActivatedRoute,
			        private router: Router) { }

	ngOnInit() {
	// Go get the progress bar img string
	this.displayBar = this.utilsService.progressBarPic(this.deck.progressBar);
	this.displayHeart = this.utilsService.heartPic(this.deck.favorite);
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
	    this.displayHeart = this.utilsService.heartPic(this.deck.favorite);
	}

}
