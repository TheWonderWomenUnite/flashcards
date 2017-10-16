import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
import { DeckDetailComponent } from './deck-detail.component';
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

    // Attributes for the "sort by" drop down
    optionChoice: number[];
    sortOptions: IMultiSelectOption[];
    sortTexts: IMultiSelectTexts = { defaultTitle: 'Sort By' };

    // These settings limit dropdown to one choice (for both drop downs)
    dropSettings: IMultiSelectSettings = {
        selectionLimit: 1,
        autoUnselect: true
        };

    constructor(private route: ActivatedRoute,
                private deckService: DeckService,
                private utilsService: UtilsService) {
    }

    ngOnInit() {
        this.sortOptions = [
            { id: 1, name: 'Category' },
            { id: 2, name: 'Last Played' },
            { id: 3, name: 'Favorites' },
        ];

        // Get the userId from the params, if there is no userId it is 
        // anonymous play
        this.route.params
            .subscribe((params: Params) =>{
                // Get the user Id from the route parameters
                this.userId = params['id'];
				console.log("Hi from deck-list, id = "+this.userId);
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

    // onSortBy(sortOrder:string) {
    onSortBy() {
        console.log("Sort decks by "+this.optionChoice);
        switch(this.optionChoice[0]) {
            case 1:
                // Sort decks by category
                break;
            case 2:
                // Sort decks by last played
                break;
            case 3:
                // Sort decks by favorites
                break;
        }
    }
    
}
