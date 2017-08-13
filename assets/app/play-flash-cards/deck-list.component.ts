import { Component, OnInit } from "@angular/core";

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
import { DeckDetailComponent } from './deck.component';
import { UtilsService } from "../shared/utils.service";

@Component({
    selector: 'app-deck-list',
    template: `
        <div class="col-md-12"> 
            <a (click)="onAdd()">Add a deck</a>
        </div>
        <div class="col-md-12"> 
            <app-deck-detail
                   [deck]="deck"
                    *ngFor="let deck of decks"></app-deck-detail>
              
        </div>
    `
})

export class DeckListComponent implements OnInit {
    decks: Deck[];
    userId: string;

    constructor(private deckService: DeckService,
                private utilsService: UtilsService) {
    }

    ngOnInit() {
        this.userId = localStorage.getItem('UserId');
        console.log("DeckList -> ngOnInit: UserId = "+this.userId);
        this.deckService.getDecks(this.userId)
            .subscribe(
                (decks: Deck[]) => {
                    console.log(decks);
                    this.decks = decks;
                }
            );
            
    }

    onAdd() {
        // Add a new deck for this user
        const newName = this.utilsService.randomString(20);
        const newCategory = this.utilsService.randomString(15);
        const newDeck = new Deck(newName, true, newCategory, this.userId);
        
        this.deckService.addDeck(newDeck).subscribe(
            (deck: Deck) => {
                console.log(deck);
            });
    }
}