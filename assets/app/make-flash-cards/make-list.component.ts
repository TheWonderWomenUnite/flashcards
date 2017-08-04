import { Component, OnInit } from "@angular/core";

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
import { MakeDetailComponent } from './make-detail.component';

@Component({
    selector: 'app-make-list',
    template: `
        <div class="col-md-12"> 
            <app-make-detail
                   [deck]="deck"
                    *ngFor="let deck of decks"></app-make-detail>
            
        </div>
    `
})

export class MakeListComponent implements OnInit {
    decks: Deck[];

    constructor(private deckService: DeckService) {
        console.log("Hi from the constructor for make-list");
    }

    ngOnInit() {
        const userId = localStorage.getItem('UserId');
        console.log("Hi from ngOnInit, UserId = "+userId);
        this.deckService.getDecks(userId)
            .subscribe(
                (decks: Deck[]) => {
                    this.decks = decks;
                }
            );
            
    }
}