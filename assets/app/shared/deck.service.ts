import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';

import { Deck } from "../models/deck.model";
import { ErrorService } from "../errors/error.service";

/** 
* Handles all Deck object operations and HTTP calls
*
*/
@Injectable()
export class DeckService {
    private decks: Deck[] = [];
    decksChanged = new Subject<Deck[]>();

    constructor(private http: Http, private errorService: ErrorService) {}

	/**
	* Make HTTP call to get all of the decks for the current user
	* the response is in the form of the NodeJS model, 
    * so I convert the returned data to the typescript model
	*/
    getDecks(userId: string) {
        console.log("getDecks: Going to call get with userId: "+userId);
        return this.http.get('https://awesome-flashcards.herokuapp.com/decks/userDecks/' + userId)
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
                return this.decks.slice();
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        
    }

	/**
	* Make HTTP call to get unowned decks for cloning
	*/
    getUnownedDecks() {
    // Call this method without a userId to get all of the unowned decks, works 
        console.log("GetUnOwnedDecks: going to call get with userOwned false");
        return this.http.get('https://awesome-flashcards.herokuapp.com/decks/unownedDecks/')
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

	/**
	* Accessor method, return a deck object given the deckId
	* assumes that the deck array for the current user is in this.decks
	*/
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

	/**
	* Clone the deck passed as the parameter, assumes that the owner is 
	* the currently logged in user, the server side copies all cards as well
	*/
    cloneDeck(deck: Deck) {
        console.log("cloneDeck: going to call post with id "+deck.deckId);
        const body = JSON.stringify(deck);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token') 
            : ''; 
        return this.http.post('https://awesome-flashcards.herokuapp.com/decks/clone/' + deck.deckId + token, body, {headers: headers})
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
                this.decksChanged.next(this.decks.slice());
                return deck;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    

    }

	/** 
	* Makes the HTTP call to save the passed deck object
	*/
    addDeck(deck: Deck) {
        // Call this method to add a deck
        console.log("addDeck: Going to call post with userId = "+deck.userId);        
        const body = JSON.stringify(deck);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token') 
            : ''; 

        return this.http.post('https://awesome-flashcards.herokuapp.com/decks/' + token, body, {headers: headers})
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
                this.decksChanged.next(this.decks.slice());
                return deck;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

	/** 
	* Update the passed deck object
	*/
    updateDeck(deck: Deck) {
    // Call this method to update a deck
        console.log("updateDeck: Calling patch with deckId = "+deck.deckId);
        const body = JSON.stringify(deck);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token') 
            : ''; 
    
        return this.http.patch('https://awesome-flashcards.herokuapp.com/decks/' + deck.deckId + token, body, {headers: headers})
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
                        this.decks[i].name = deck.name;
                        this.decks[i].userOwned = deck.userOwned;
                        this.decks[i].category = deck.category;
                        this.decks[i].lastPlayed = deck.lastPlayed;
                        this.decks[i].progressBar = deck.progressBar;
                        this.decks[i].favorite = deck.favorite;
                    }
                }
                this.decksChanged.next(this.decks.slice());
                return deck;

            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }

	/**
	* Make the HTTP call to delete this deck object, server side deletes the cards
	*/
    deleteDeck(deck: Deck) {
    // Call this method to delete a deck, deletes the cards for this deck as well
        this.decks.splice(this.decks.indexOf(deck), 1);
        this.decksChanged.next(this.decks.slice());
        console.log("deleteDeck: Going to call delete with deckId = "+deck.deckId);
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token') 
            : ''; 
        return this.http.delete('https://awesome-flashcards.herokuapp.com/decks/' + deck.deckId + token)
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
