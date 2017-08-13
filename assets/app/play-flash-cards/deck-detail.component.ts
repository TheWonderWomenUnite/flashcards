import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
import { UtilsService } from "../shared/utils.service";

@Component({
    selector: 'app-deck-detail',
    templateUrl: './deck-detail.component.html'    
})

export class DeckDetailComponent implements OnInit {
  @Input() deck: Deck;

  constructor(private deckService: DeckService,
  		        private utilsService: UtilsService,
	   	        private route: ActivatedRoute,
			        private router: Router) {}

	onPlay() {
		this.router.navigate(['./', 'play', this.deck.deckId], {relativeTo: this.route});

	}

  	onEdit() {
    	console.log("DeckDetail-> onEdit: deck Id is "+this.deck.deckId);

    	const editDeck = new Deck(
    		this.utilsService.randomString(12), 
    		true, 
    		this.utilsService.randomString(12),
        this.deck.userId,
        this.deck.deckId);
    	
    	this.deckService.updateDeck(editDeck).subscribe(
    	  (deck: Deck) => {
    	    console.log(deck);
    	  });
  	}

	  onDelete() {
	    console.log("DeckDetail-> onDelete: deck Id = "+this.deck.deckId);
	    this.deckService.deleteDeck(this.deck).subscribe(
	      (deck: Deck) => {
	        console.log(deck);
       		this.router.navigate('', {relativeTo: this.route});
	      });

	  }
}
