import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
// import { DeckDetailComponent } from './deck.component';
// DMZ changed
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

    constructor(private route: ActivatedRoute,
                private deckService: DeckService,
                private utilsService: UtilsService) {
    }

    ngOnInit() {

        // Get the current userId from local storage 
        // this.userId = localStorage.getItem('UserId');
        // console.log("DeckList -> ngOnInit: UserId = "+this.userId);

        // Now, get the userId from the params, as we are now being
        // routed to here
        this.route.params
            .subscribe((params: Params) =>{
                // Get the user Id from the route parameters
                this.userId = params['id'];
                this.deckService.getDecks(this.userId)
                    .subscribe(
                        (decks: Deck[]) => {
                        console.log(decks);
                        this.decks = decks;
                    });
            });            
    }

    onSortBy(sortOrder:string) {
        console.log("Sort by "+sortOrder);
    }

    onGoBack() {
        // This component should have a back button that takes you 
        // back to a general welcome screen
    }

    /*
    This was temporarily here to test the deck service
    To add it back in, add an "add deck" button to the template
    onAdd() {
        // Add a new deck for this user
        const newName = this.utilsService.randomString(20);
        const newCategory = this.utilsService.randomString(15);
        const newDeck = new Deck(newName, true, newCategory, Date.now(), 42, true, this.userId);
        
        this.deckService.addDeck(newDeck).subscribe(
            (deck: Deck) => {
                console.log(deck);
            });
    }
    */
}