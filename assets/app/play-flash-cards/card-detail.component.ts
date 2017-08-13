import { Component, Input, OnInit } from "@angular/core";
import { Card } from "../models/card.model";
import { CardService } from "../shared/card.service";
import { UtilsService } from "../shared/utils.service";

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html'    
})

export class CardDetailComponent implements OnInit {
	@Input() card: Card;

  	constructor(private cardService: CardService,
  				private utilsService: UtilsService) { }

    ngOnInit() {
    }  

  	onEdit() {
    	console.log("CardDetail -> onEdit: card Id is "+this.card.cardId);
    	const newSide1 = this.utilsService.randomString(10); 
    	const newSide2 = this.utilsService.randomString(10);
    	const newCard = new Card(newSide1, newSide2, 
                            this.card.deckId, this.card.cardId);
    	this.cardService.updateCard(newCard).subscribe(
    	  (card: Card) => {
    	    console.log(card);
    	  });
  	}

	onDelete() {
    	console.log("CardDetail -> OnDelete: card Id = "+this.card.cardId);
    	this.cardService.deleteCard(this.card).subscribe(
      		(card: Card) => {
        	console.log(card);
      	});

  	}    

}    
