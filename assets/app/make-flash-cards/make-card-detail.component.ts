import { Component, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

// import { Deck } from "../models/deck.model";
// import { DeckService } from "../shared/deck.service";
// import { UtilsService } from "../shared/utils.service";

// DMZ TBD - I THINK I CAN DROP ALL MAKE-CARD-DETAIL stuff/not using??
import { Card } from "../models/card.model";
import { CardService } from "../shared/card.service";
import { UtilsService } from "../shared/utils.service";


@Component({
  selector: 'app-make-card-detail',
	templateUrl: './make-card-detail.component.html',
	styleUrls: ['./make-card-detail.component.css']  
})

export class MakeCardDetailComponent {
  @Input() card: Card;
	display = 'none';
	displayAddCard = 'none';

	newQuestion = "";
	newAnswer = "";

 	constructor(private cardService: CardService,
 			        private utilsService: UtilsService,
			        private route: ActivatedRoute,
			        private router: Router) { }

	ngOnInit() {
	}

	onAddCard() {
    console.log('add card');
    // this.displayAddDeck = 'block';
	}

	private onAddNewCard(answer:number) {
    // Get rid of the modal
		// this.displayAddDeck = 'none';
		// console.log('adding/cloning deck for: ' + this.newCategory + ' and ' + this.newDeckName);

		// Add a new deck
    // if (answer === 1) {
			// TBD ask Lisa for help here
      // Add general info for new deck
   
   
      // this.deckService.addDeck(this.deck).subscribe(
      //   (deck: Deck) => {
      //     console.log(deck);
  
  
          // then either call onEdit() or something close to this router & require at least one card to be added?
				// TBD think this will need same url as onEdit once that works...
				//this.router.navigate(['./makeflashcards', 'edit', this.deck.deckId]);
			// });
						
		}

		onDelete() {
			// Show the delete modal
			console.log('deleting card #:');
			console.log(this.card.cardId);
			
			// this.display = 'block';
		}

		// private onModalResponse(answer:boolean) {
		//   // Get rid of the modal
		// 	this.display = 'none';
		// 	console.log('onModalResponse just called');
			
		//   if (answer) {
		//     // Delete the deck
		//     this.deckService.deleteDeck(this.deck).subscribe(
		//       (deck: Deck) => {
		//         console.log(deck);
		//         // Navigate back to the list
		//         //this.router.navigate(['./makeflashcards/', 'makelist', this.deck.userId]);            
		// 			});
		// 	}
		// }

		onEdit() {
			console.log('going to edit card #:');
			console.log(this.card.cardId);
			//OLD this.router.navigate(['./makeflashcards', 'edit', this.deck.deckId]);
		}
	}
}
