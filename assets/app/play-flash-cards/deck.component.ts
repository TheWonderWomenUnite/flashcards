import { Component, Input } from "@angular/core";

import { Deck } from "../models/deck.model";
import { DeckService } from "../decks/deck.service";

@Component({
    selector: 'app-deck-detail',
    templateUrl: './deck.component.html'    
})

export class DeckComponent {
    @Input() deck: Deck;

   // constructor(private deckService: DessageService) {}

    onEdit() {

    }

    onDelete() {
    
    }

    belongsToUser() {

    }

}
