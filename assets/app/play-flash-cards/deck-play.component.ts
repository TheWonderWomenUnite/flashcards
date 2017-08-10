import { Component } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { Card } from "../models/card.model";
import { CardService } from '../shared/card.service';
import { DeckService } from '../shared/deck.service';

@Component({
    selector: 'app-deck-play',
    templateUrl: './deck-play.component.html'
})

export class DeckPlayComponent {
  // Deck is passed as a parameter
	deckId: string;
  deck: Deck;
  cards: Card[];

	constructor(private route: ActivatedRoute,
              private cardService: CardService,
              private deckService: DeckService,
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

    const side1 = randomString(10);
    const side2 = randomString(10);
    const newCard = new Card(side1, side2, this.deckId);
    console.log("Going to addcard with Id = "+this.deckId);
    this.cardService.addCard(newCard).subscribe(
      (card: Card) => {
        console.log(card);
      });

  } 

  onEdit(index: number) {
    console.log("Hi from onEdit, card Id is "+card.cardId);
    const newSide1 = randomString(10); 
    const newSide2 = randomString(10);
    const newCard = new Card(newSide1, newSide2, 
                            this.deckId, this.cards[index].cardId);
    console.log("New card Id is "+newCard.cardId)
    this.cardService.updateCard(newCard).subscribe(
      (card: Card) => {
        console.log(card);
      });
  }

  onDelete(card: Card) {
    console.log("Hi from delete, card Id = "+card.cardId);
    this.cardService.deleteCard(card).subscribe(
      (card: Card) => {
        console.log(card);
      });

  }    

  function randomString(strlen: number) {
    // Given a strlen, generate and return a random string of length strlen
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < strlen; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}