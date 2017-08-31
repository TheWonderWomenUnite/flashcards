import { Component, Input, OnInit } from "@angular/core";
import { PercentPipe } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
import { UtilsService } from "../shared/utils.service";

@Component({
    selector: 'app-deck-detail',
    templateUrl: './deck-detail.component.html'    
})

export class DeckDetailComponent implements OnInit {
  // This component displays the details of a deck. There are 
  // three buttons with click listeners on the template
  // onPlay - routes the user to the deck-play component
  // onEdit - for testing purposes, uses random data to test the deckservice 
  // updateDeck method
  // onDelete = for testing purposes, allows the user to delete a deck  

  @Input() deck: Deck;
  displayBar: String = '';
  displayHeart: String = '';

  constructor(private deckService: DeckService,
  		        private utilsService: UtilsService,
	   	        private route: ActivatedRoute,
			        private router: Router) {}

  ngOnInit() {
    // Go get the progress bar img string
    this.displayBar = this.utilsService.progressBarPic(this.deck.progressBar);
    this.displayHeart = this.utilsService.heartPic(this.deck.favorite);

  }  

	onPlay() {
		this.router.navigate(['./playflashcards/', 'play', this.deck.deckId]);

	}

	onEdit() {
    // This is here to test the deck service - edit a deck with 
    // a bunch of random data
  	console.log("DeckDetail-> onEdit: deck Id is "+this.deck.deckId);

  	const editDeck = new Deck(
  		this.utilsService.randomString(12), 
  		true, 
  		this.utilsService.randomString(12),
      Date.now(),
      Math.floor((Math.random() * 10) + 1),
      false,
      this.deck.userId,
      this.deck.deckId);
  	
  	this.deckService.updateDeck(editDeck).subscribe(
  	  (deck: Deck) => {
  	    console.log(deck);
  	  });
	}

	  onDelete() {
      // This is here to test the deck service - delete a deck
      // given an ID
      console.log("DeckDetail-> onDelete: deck Id = "+this.deck.deckId);
	    this.deckService.deleteDeck(this.deck).subscribe(
	      (deck: Deck) => {
	        console.log(deck);
       		this.router.navigate('', {relativeTo: this.route});
	      });

	  }
}
