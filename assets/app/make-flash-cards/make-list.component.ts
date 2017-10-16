import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
import { MakeDetailComponent } from './make-detail.component';

@Component({
    selector: 'app-make-list',
    templateUrl: './make-list.component.html',
    styleUrls: ['./make-list.component.css']
})

export class MakeListComponent implements OnInit, OnDestroy {
    decks: Deck[];
    cloneDecks: Deck[];
    userId: string;
    subscription: Subscription;
    // When display is block, display the add deck modal
    display = 'none';
	
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
                private router: Router,
                private deckService: DeckService) {}

    ngOnInit() {
	
        this.sortOptions = [
            { id: 1, name: 'Category' },
            { id: 2, name: 'Last Played' },
            { id: 3, name: 'Favorites' }
        ];
	
        this.userId = localStorage.getItem('UserId');
        console.log("UserId = "+this.userId);
        this.subscription = this.deckService.decksChanged.
            subscribe((decks: Deck[]) => {
            console.log("Hi from decksChanged");
            this.decks = decks;
            });
        this.deckService.getDecks(this.userId)
            .subscribe(
            (decks: Deck[]) => {
            console.log(decks);
            this.decks = decks;
            });
 
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


    onSortBy() {
        console.log("Sort decks by " + this.optionChoice[0]);
        console.log(this.decks);

        // First sort deck by deck name so that sorts within switch cases
        // below will sort by name within category/favs etc
        // (otherwise you have to use more complex/less readable sorts in switch below)
        this.decks.sort((a, b) => a.name.localeCompare(b.name));

        switch(this.optionChoice[0]) {
            case 1:
                // Sort decks by category
                this.decks.sort((a, b) => a.category.localeCompare(b.category));
                break;
            case 2:
                // Sort decks by last played
				
                this.decks.sort((a, b) => {
					if (a.lastPlayed === null && b.lastPlayed === null)
						return 0;
					if (a.lastPlayed === null)
						return 1;
					return (b.lastPlayed.valueOf() - a.lastPlayed.valueOf());
					});
                break;
            case 3:
                // Sort decks by favorites
                this.decks.sort((a, b) => (!a.favorite && b.favorite) ? 1 : 0 );
                break;
            }    

        }


}