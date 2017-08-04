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
        // Call this method with a user Id to get all of the decks
        // that belong to a user
        console.log("Going to call get with DeckId: "+deckId);
        return this.http.get('http://localhost:3000/cards' + deckId)
            .map((response: Response) => {
                const cards = response.json().obj;
                let transformedCards: Card[] = [];
                for (let card of cards) {
                    transformedCards.push(new Card(
                    card.side1,
                    card.side2,
                    card.deckId)
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

}    