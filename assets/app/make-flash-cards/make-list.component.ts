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

    // TBD change to global var so that user sees same order whether they're
    // in make or play. (same code in both make-list and deck-list for now)
    // Initially sort by category
    sortBy = 1;

    // Attributes for the "sort by" drop down
    optionChoice: number[];
    sortOptions: IMultiSelectOption[];
    sortTexts: IMultiSelectTexts = { defaultTitle: 'Sort By' };

    // When cloneDrop is true, display the dropdown to choose a deck to clone
    cloneDrop: boolean = false;
    cloneChoice: number[];
    // cloneDeckList: IMultiSelectOption = [];
    cloneDeckList: IMultiSelectOption[];
    cloneTexts: IMultiSelectTexts = { defaultTitle: 'Deck to Clone' };


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
            this.sortDecks(this.sortBy);
            });
        this.deckService.getDecks(this.userId)
            .subscribe(
            (decks: Deck[]) => {
            console.log(decks);
            this.decks = decks;
            this.sortDecks(this.sortBy);
        });
 
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

//     onAddDeck() {
//         // throw up a modal and see if they want to create their own or clone
//         this.display = 'block';
//     }

//     private onModalResponse(answer:number) {
//         // This function fires when the user has made a selection on 
//         // the add card modal. 
//         // Possible answers:
//         // 0) Cancel and do nothing 
//         // 1) User wants to create his own deck, route to the edit screen
//         // 2) User would like to clone one of the existing decks

//         //Get rid of the modal
//         if (answer == 1) {
//             // they want to make their own, go to the make-add component
//             this.display = 'none';
//             this.router.navigate(['./makeflashcards/', 'add']);
//         } else if (answer == 2) {
//             // Go to deckservice and get list of possible decks to clone 
//             // to populate the dropdown list should look like
//             console.log(this.cloneDeckList);
//             console.log("Going to call getUnownedDecks");
//             this.cloneDeckList = [];
//             this.deckService.getUnownedDecks()
//                 .subscribe(
//                 (decks: Deck[]) => {
//                     console.log(decks);
//                     for (let deck of decks) {
//                         const deckName = deck.category+'-'+deck.name;
//                         this.cloneDeckList.push({id:deck.deckId, name:deckName});  
//                         }
//                     // Make the dropdown list show so the user can pick 
//                     // a deck to clone  
//                     this.cloneDrop = true;
//                 });

//             }

//     }

//     onClone() {
//         // This function fires when the user chooses a deck to clone
//         // this.cloneChoice is the id of the deck to clone
//         // Because of the subscription to deckschanged, the list will show
//         // the newly added cloned deck
//         this.display = 'none';
//         const deckToClone: Deck = this.deckService.getDeck(this.cloneChoice);
//         this.deckService.cloneDeck(deckToClone)
//             .subscribe(
//                 (deck: Deck) => {
//                    console.log(deck);
//                 });

//     }
 
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