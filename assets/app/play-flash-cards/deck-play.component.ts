import { Component } from "@angular/core";
import { Deck } from "../models/deck.model";
import { Card } from "../models/card.model"
import { CardListComponent } from './card-list.component';

@Component({
    selector: 'app-deck-play',
    templateUrl: './deck-play.component.html'
})

export class DeckPlayComponent {
	// Deck is passed as a parameter
    deck: Deck;
    cards: Card[];
}