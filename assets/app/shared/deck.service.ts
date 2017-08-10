import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Deck } from "../models/deck.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class DeckService {
    private decks: Deck[] = [];

   constructor(private http: Http, private errorService: ErrorService) {
    }

    getDecks(userId: string) {
        // Call this method with a user Id to get all of the decks
        // that belong to a user
        console.log("Going to call get with userId: "+userId);
        return this.http.get('http://localhost:3000/decks/userDecks/' + userId)
            .map((response: Response) => {
                const decks = response.json().obj;
                let transformedDecks: Deck[] = [];
                for (let deck of decks) {
                    transformedDecks.push(new Deck(
                    deck.name,
                    deck.userOwned,
                    deck.category,
                    deck.userId,
                    deck._id)
                    );
                }
                this.decks = transformedDecks;
                return transformedDecks;
            })
            .catch((error: Response) => {
                console.log("Hi from the catch block for getdecks");
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        
    }

    getOrphanDecks() {
        // Call this method without a userId it returns all of the decks
        // that don't belong to a user
        console.log("Going to call get with userOwned false");
        return this.http.get('http://localhost:3000/decks/userDecks/unOwned')
            .map((response: Response) => {
                const decks = response.json().obj;
                let transformedDecks: Deck[] = [];
                for (let deck of decks) {
                    transformedDecks.push(new Deck(
                    deck.name,
                    deck.userOwned,
                    deck.category,
                    deck.userId,
                    deck._id)
                    );
                }
                this.decks = transformedDecks;
                return transformedDecks;
            })
            .catch((error: Response) => {
                console.log("Hi from the catch block for getdecks");
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        
    }

    getDeck(deckId: string) {
        
        for (let i = 0; i < this.decks.length; i++) {
            if (this.decks[i].deckId == deckId) {
                return this.decks[i];
            }
        }
        
        return null;
        
    }

    addDeck(deck: Deck) {

        // Call this method to add a deck
        // Although this deck may be an orphan, the user must be logged in
        const body = JSON.stringify(deck);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token') 
            : ''; 
        console.log("this is with the catch block");
        return this.http.post('http://localhost:3000/decks/' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const deck = new Deck(
                    result.obj.name,
                    result.obj.userOwned,
                    result.obj.category,
                    result.obj.userId,
                    result.obj._id);
                this.decks.push(deck);
                return deck;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateDeck(deck: Deck) {
        const body = JSON.stringify(deck);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token') 
            : ''; 
        // See the routes/app.js file for this route,
        // this sets up an observable
        return this.http.patch('http://localhost:3000/decks/' + deck.deckId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }

    deleteDeck(deck: Deck) {
        this.decks.splice(this.decks.indexOf(deck), 1);
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token') 
            : ''; 
        return this.http.delete('http://localhost:3000/decks/' + deck.deckId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}    
