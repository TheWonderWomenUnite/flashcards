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
    // that belong to a user, the response is in the form of the NodeJS model, 
    // so I convert the returned data to the typescript model
        console.log("getDecks: Going to call get with userId: "+userId);
        return this.http.get('http://localhost:3000/decks/userDecks/' + userId)
            .map((response: Response) => {
                const decks = response.json().obj;
                let transformedDecks: Deck[] = [];
                for (let deck of decks) {
                    transformedDecks.push(new Deck(
                    deck.name,
                    deck.userOwned,
                    deck.category,
                    deck.lastPlayed,
                    deck.progressBar,
                    deck.favorite,
                    deck.user,
                    deck._id)
                    );
                }
                this.decks = transformedDecks;
                return this.decks;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        
    }

    getUnownedDecks() {
    // Call this method without a userId to get all of the unowned decks, works 

        console.log("GetUnOwnedDecks: going to call get with userOwned false");
        return this.http.get('http://localhost:3000/decks/userDecks/unOwned')
            .map((response: Response) => {
                const decks = response.json().obj;
                let transformedDecks: Deck[] = [];
                for (let deck of decks) {
                    transformedDecks.push(new Deck(
                    deck.name,
                    deck.userOwned,
                    deck.category,
                    deck.lastPlayed,
                    deck.progressBar,
                    deck.favorite,
                    deck.user,
                    deck._id)
                    );
                }
                this.decks = transformedDecks;
                return this.decks;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        
    }

    getDeck(deckId: string) {
    // Call this method to find the deck object in this.decks array    
        for (let i = 0; i < this.decks.length; i++) {
            if (this.decks[i].deckId == deckId) {
                return this.decks[i];
            }
        }
    
        // The deck object was not found in the array, return null    
        return null;
    }

    addDeck(deck: Deck) {
    // Call this method to add a deck

        console.log("addDeck: Going to call post with userId = "+deck.userId);        
        const body = JSON.stringify(deck);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token') 
            : ''; 

        return this.http.post('http://localhost:3000/decks/' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json().obj;
                const deck = new Deck(
                    result.name,
                    result.userOwned,
                    result.category,
                    result.lastPlayed,
                    result.progressBar,
                    result.favorite,
                    result.user,
                    result._id);
                // Update this.decks array
                this.decks.push(deck);
                return deck;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateDeck(deck: Deck) {
    // Call this method to update a deck
        console.log("updateDeck: Calling patch with deckId = "+deck.deckId);
        const body = JSON.stringify(deck);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token') 
            : ''; 
    
        return this.http.patch('http://localhost:3000/decks/' + deck.deckId + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json().obj;
                const deck = new Deck(
                    result.name,
                    result.userOwned,
                    result.category,
                    result.lastPlayed,
                    result.progressBar,
                    result.favorite,
                    result.user,
                    result._id);

                // Find this deck in the this.decks array and update the data
                for (let i = 0; i < this.decks.length; i++)
                {
                    if (this.decks[i].deckId == deck.deckId) {
                        this.decks.name = deck.name;
                        this.decks.userOwned = deck.userOwned;
                        this.decks.category = deck.category;
                        this.decks.lastPlayed = deck.lastPlayed;
                        this.decks.progressBar = deck.progressBar;
                        this.decks.favorite = deck.favorite;
                    }
                }
                
                return deck;

            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }

    deleteDeck(deck: Deck) {
    // Call this method to delete a deck
        this.decks.splice(this.decks.indexOf(deck), 1);
        console.log("deleteDeck: Going to call delete with deckId = "+deck.deckId);
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token') 
            : ''; 
        return this.http.delete('http://localhost:3000/decks/' + deck.deckId + token)
            .map((response: Response) => {
                const result = response.json().obj;
                return result;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}    
