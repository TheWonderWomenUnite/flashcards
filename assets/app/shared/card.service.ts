import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Card } from "../models/card.model";
import { ErrorService } from "../errors/error.service";
/** 
* Contains all of the methods for creating, updating and deleting deck objects
*/
@Injectable()
export class CardService {
    private cards: Card[] = [];

   	constructor(private http: Http, 
                private errorService: ErrorService) { }

    getCards(deckId: string) {
    // Call this method with a deck Id to get all of the cards
    // that belong to a deck. The response array is in the form
    // of the NodeJS model, you have to convert the array to the 
    // form of the typescript model
        console.log("GetCards: Going to call get with DeckId: "+deckId);
        return this.http.get('http://localhost:3000/cards/' + deckId)
            .map((response: Response) => {
                const cards = response.json().obj;
                let transformedCards: Card[] = [];
                for (let card of cards) {
                    let newCard = new Card(
                        card.side1,
                        card.side2, 
                        card.deck,
                        card._id);
                    transformedCards.push(newCard);
                }
                this.cards = transformedCards;
                return this.cards;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        
    }

    addCard(card: Card) {
    // Call this method to add a card to a deck, the deckId is part
    // of the card object
    // Although this deck may be an orphan, the user must be logged in
        console.log("addCard: going to call post with deckId = "+card.deckId);
        const body = JSON.stringify(card);
        const headers = new Headers({'Content-Type': 'application/json'});
               
        return this.http.post('http://localhost:3000/cards/' + card.deckId, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json().obj;
                const card = new Card(
                    result.side1,
                    result.side2,
                    result.deck,
                    result._id
                    );
                // After the call update this.cards array
                this.cards.push(card);
                return card;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateCard(card: Card) {
    // Call this method to update a card
    
        console.log("UpdateCard: calling patch with cardId = "+card.cardId);
        const body = JSON.stringify(card);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.patch('http://localhost:3000/cards/' + card.cardId, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json().obj;
                const card = new Card(
                    result.side1,
                    result.side2,
                    result.deck,
                    result._id
                    );

                // After the call update this.cards array                                              
                for (let i = 0; i < this.cards.length; i++)
                {
                    if (this.cards[i].cardId == card.cardId) {
                        this.cards[i].side1 = card.side1;
                        this.cards[i].side2 = card.side2;           
                    }
                }
                return card;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }

    deleteCard(card: Card) {
        // Call this method to delete a card        
        // Update this.cards array
        this.cards.splice(this.cards.indexOf(card), 1);
        console.log("deleteCard: calling delete with cardId = "+card.cardId);                
        return this.http.delete('http://localhost:3000/cards/' + card.cardId)
            .map((response: Response) => {
                const result = response.json().obj;
                return result;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteAllCards(deckId: string) {
    // Call this method to delete all cards for a deck (Does not affect the deck itself)
        console.log("deleteAllCards: Going to call delete with deckId = "+deckId);
        const token = localStorage.getItem('token') 
            ? '?token=' + localStorage.getItem('token') 
            : ''; 

        this.cards = [];    
        return this.http.delete('http://localhost:3000/cards/allCards/' + deckId + token)
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
