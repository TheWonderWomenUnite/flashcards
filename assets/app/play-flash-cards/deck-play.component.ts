import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { Card } from "../models/card.model";
import { CardService } from '../shared/card.service';
import { DeckService } from '../shared/deck.service';
import { UtilsService } from '../shared/utils.service';

@Component({
    selector: 'app-deck-play',
    templateUrl: './deck-play.component.html'
})

export class DeckPlayComponent implements ngOnInit {
  // Deck is passed as a parameter
	deckId: string;
  deck: Deck;
  cards: Card[];

	constructor(private route: ActivatedRoute,
              private cardService: CardService,
              private deckService: DeckService,
              private utilsService: UtilsService,
        		  private router: Router) { }

	ngOnInit() {
  		this.route.params
  			.subscribe(
  				(params: Params) =>{
  					this.deckId = params['id'];
            this.deck = this.deckService.getDeck(this.deckId);
            console.log(this.deck.name+" "+this.deck.category);
  					this.cardService.getCards(this.deckId)
            	.subscribe(
              	(cards: Card[]) => {
                 		this.cards = cards;
                 		console.log(this.cards);
              	});
  				});

  	}

  onAdd() {
    // Add a new card to this deck
    const side1 = this.utilsService.randomString(10);
    const side2 = this.utilsService.randomString(10);
    const newCard = new Card(side1, side2, this.deckId);
    this.cardService.addCard(newCard).subscribe(
      (card: Card) => {
        console.log(card);
      });
  } 

}