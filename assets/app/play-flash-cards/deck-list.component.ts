import { Component, OnInit } from "@angular/core";

import { Deck } from "../models/deck.model";
import { DeckService } from "../decks/deck.service";
import { DeckComponent } from './deck.component';

@Component({
    selector: 'app-deck-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-deck-detail
                   [deck]="deck"
                    *ngFor="let deck of decks"></app-deck-detail>
              
        </div>
    `
})

export class DeckListComponent implements OnInit {
    decks: Deck[];

    constructor(private deckService: DeckService) {}

    ngOnInit() {
        this.deckService.getDecks()
            .subscribe(
                (decks: Deck[]) => {
                    this.decks = decks;
                }
            );
    }
}