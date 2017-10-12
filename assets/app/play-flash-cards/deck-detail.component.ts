import { Component, Input, OnInit } from "@angular/core";
import { PercentPipe } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
import { UtilsService } from "../shared/utils.service";

@Component({
    selector: 'app-deck-detail',
    templateUrl: './deck-detail.component.html',
    styleUrls: ['./deck-detail.component.css']
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
  isFavorite = false;
  progressPct = 0;


  constructor(private deckService: DeckService,
  		        private utilsService: UtilsService,
	   	        private route: ActivatedRoute,
			        private router: Router) {}

  ngOnInit() {
    this.progressPct = this.deck.progressBar;
    this.isFavorite = this.deck.favorite;
  }  

	onPlay() {
		this.router.navigate(['./playflashcards/', 'play', this.deck.deckId]);

	}

}
