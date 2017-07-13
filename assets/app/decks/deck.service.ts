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
                    deck.userId)
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

}    
