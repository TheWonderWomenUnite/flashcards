import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Card } from "../models/card.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class CardService {
    private cards: Card[] = [];

   	constructor(private http: Http, private errorService: ErrorService) {
    }

    getCards(deckId: string) {
        // Call this method with a deck Id to get all of the cards
        // that belong to a deck
        console.log("Going to call get with DeckId: "+deckId);
        return this.http.get('http://localhost:3000/cards/' + deckId)
            .map((response: Response) => {
                const cards = response.json().obj;
                let transformedCards: Card[] = [];
                for (let card of cards) {
                    transformedCards.push(new Card(
                    card.side1,
                    card.side2,
                    card.deckId,
                    card.cardId)
                    );
                }
                this.cards = transformedCards;
                return cards;
            })
            .catch((error: Response) => {
                console.log("Hi from the catch block for getcards");
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        
    }

    addCard(card: Card) {

        // Call this method to add a deck
        // Although this deck may be an orphan, the user must be logged in
        const body = JSON.stringify(card);
        const headers = new Headers({'Content-Type': 'application/json'});
        
        return this.http.post('http://localhost:3000/cards/' + card.deckId, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const card = new Card(
                    result.obj.side1,
                    result.obj.side2,
                    result.obj.deckId,
                    result.obj.cardId
                    );
                this.cards.push(card);
                return card;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateCard(card: Card) {
        console.log("Hi from updateCard, card is "+card);

        const body = JSON.stringify(card);
        const headers = new Headers({'Content-Type': 'application/json'});
        
        console.log("Card Id is "+card._id);
        // See the routes/app.js file for this route,
        // this sets up an observable
        return this.http.patch('http://localhost:3000/cards/' + card._id, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const card = new Card(
                    result.obj.side1,
                    result.obj.side2,
                    result.obj.deckId,
                    result.obj.cardId
                    );
                return card;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }

    deleteCard(card: Card) {
        this.cards.splice(this.cards.indexOf(card), 1);
        
        return this.http.delete('http://localhost:3000/cards/' + card._id)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}    