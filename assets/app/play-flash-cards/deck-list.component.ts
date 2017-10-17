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

    // TBD change to global var so that user sees same order whether they're
    // in make or play. (same code in both make-list and deck-list for now)
    // Initially sort by category
    sortBy = 1;    

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
                            this.sortDecks(this.sortBy);                            
                        });
                }
                else {
                    this.deckService.getUnownedDecks()
                        .subscribe(
                            (decks: Deck[]) => {
                            console.log(decks);
                            this.decks = decks;
                            this.sortDecks(this.sortBy);                            
                        });
                }
            });            
    }

    onGoBack() {
        // This component should have a back button that takes you 
        // back to a general welcome screen
    }

    onSortBy() {
        console.log("Sort decks by " + this.optionChoice[0]);
        console.log(this.decks);
        this.sortBy = this.optionChoice[0];
        this.sortDecks(this.sortBy);
    }

   // TBD would be best to have this code only in deck service -
    // currently it's in 2 places: make-list and deck-list
    private sortDecks(sortBy) {

        // First sort deck by deck name within category(so that decks will sort 
        // by cat + name for both the sort by 'Categ' option and 'Favs' option)
        this.decks.sort((a, b) => a.name.localeCompare(b.name));
        this.decks.sort((a, b) => a.category.localeCompare(b.category));

        switch(sortBy) {
            case 1:
                // Already done above
                break;
            case 2:
                // Sort decks by last played
                this.decks.sort((a, b) => {
                    if (a.lastPlayed === null && b.lastPlayed === null)
                        return 0;
                    if (a.lastPlayed === null)
                        return 1;

                    // this returns NaN
                    console.log(b.lastPlayed.valueOf() - a.lastPlayed.valueOf());
                    // return (b.lastPlayed.valueOf() - a.lastPlayed.valueOf());

                    // this not working for prod build, but working in dev;
                    return (Date.parse(b.lastPlayed) - Date.parse(a.lastPlayed));
                        
                });
                break;

            case 3:
                // Sort decks by favorites (note that within favs decks
                // are sorted by cat + name - see above)
                this.decks.sort((a, b) => (!a.favorite && b.favorite) ? 1 : 0 );
                break;
        }       
    }
}
