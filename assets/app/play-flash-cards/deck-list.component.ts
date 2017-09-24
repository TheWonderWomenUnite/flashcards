import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
import { DeckDetailComponent } from './deck.component';
import { UtilsService } from "../shared/utils.service";

@Component({
    selector: 'app-deck-list',
    templateUrl: './deck-list.component.html',
    styleUrls: ['./deck-list.component.css']
})

export class DeckListComponent implements OnInit {
    // This component displays the list of decks for this user
    // The details of the deck are passed to the deck-detail component for display
    decks: Deck[];
    userId: string;

    constructor(private route: ActivatedRoute,
                private deckService: DeckService,
                private utilsService: UtilsService) {
    }

    ngOnInit() {

        // Get the userId from the params, if there is no userId it is 
        // anonymous play
        this.route.params
            .subscribe((params: Params) =>{
                // Get the user Id from the route parameters
                this.userId = params['id'];
                if (this.userId) {
                    this.deckService.getDecks(this.userId)
                        .subscribe(
                            (decks: Deck[]) => {
                            console.log(decks);
                            this.decks = decks;
                        });
                }
                else {
                    this.deckService.getUnownedDecks()
                        .subscribe(
                            (decks: Deck[]) => {
                            console.log(decks);
                            this.decks = decks;
                        });
                }
            });            
    }

    onSortBy(sortOrder:string) {
        console.log("Sort by "+sortOrder);
    }

    onGoBack() {
        // This component should have a back button that takes you 
        // back to a general welcome screen
    }

}