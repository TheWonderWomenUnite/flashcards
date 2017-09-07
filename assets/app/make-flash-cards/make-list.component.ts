import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/subscription';

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
    userId: string;
    subscription: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private deckService: DeckService) {
    }
    ngOnInit() {
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

    onAddDeck() {
        // User wants to add a new deck, go to the make-add component
        this.router.navigate(['./makeflashcards/', 'add']);

    }

    onGoBack() {
        // This component should have a back button that takes you 
        // back to a general welcome screen
    }

    onSortBy(sortOrder:string) {
        console.log("Sort by "+sortOrder);
    }
}