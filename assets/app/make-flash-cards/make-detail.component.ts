import { Component, Input, ViewChild } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";
import { UtilsService } from "../shared/utils.service";

@Component({
  selector: 'app-make-detail',
	templateUrl: './make-detail.component.html',
	styleUrls: ['./make-detail.component.css']  
})

export class MakeDetailComponent {
  @Input() deck: Deck;
  @ViewChild('f') addForm: NgForm;
	
	cloneDecks: Deck[];
	display = 'none';
  displayAddDeck = 'none';
  displayShowAddFields = false;
	isFavorite = false;
	favTitle = "";
	progressPct = 0;
	userId: string;

	// When cloneDrop is true, display the dropdown to choose a deck to clone
	cloneDrop: boolean = false;
	// ask Lisa - I think this needs to be string for deck id
	cloneChoice: number[];
	cloneDeckList: IMultiSelectOption[];
	cloneTexts: IMultiSelectTexts = { defaultTitle: 'Deck to Clone' };

	// These settings limit dropdown to one choice (for both drop downs)
	dropSettings: IMultiSelectSettings = {
			selectionLimit: 1,
			autoUnselect: true
			};

 	constructor(private deckService: DeckService,
 			        private utilsService: UtilsService,
			        private route: ActivatedRoute,
			        private router: Router) { }

	ngOnInit() {
		this.userId = localStorage.getItem('UserId');
    if (this.deck) {
	  	this.progressPct = this.deck.progressBar;
		  this.isFavorite = this.deck.favorite;
		  this.favTitle = this.isFavorite ? "Click to remove 'FAVORITE' status" : "Click to mark this as a 'FAVORITE' deck";
    }
	}

	onAddDeck() {
  	// Show the add deck modal
        this.displayAddDeck = 'block';
        console.log("Showing add modal");
    }

    onAddModalResponse(answer: number) {
        if (answer === 1) {
            // Show the input form for getting the category and deckname
            this.displayShowAddFields = true;
            // When onSubmit fires, do the add
        }
        else if (answer == 2) {
            // Go to deckservice and get list of possible decks to clone 
            // to populate the dropdown list should look like
            console.log(this.cloneDeckList);
            console.log("Going to call getUnownedDecks");
            this.cloneDeckList = [];
            this.deckService.getUnownedDecks()
                .subscribe(
                (decks: Deck[]) => {
                    console.log(decks);
                    for (let deck of decks) {
                        const deckName = deck.category+'-'+deck.name;
                        this.cloneDeckList.push({id:deck.deckId, name:deckName});  
                        }
                    // Make the dropdown list show so the user can pick 
                    // a deck to clone, when they make a choice, onClone will fire  
                    this.cloneDrop = true;
                });
        }
        else {
            this.displayAddDeck = 'none';
        }

    }

    onSubmit() {
        const newDeck = new Deck(this.addForm.value.newDeckName,
            true,
            this.addForm.value.newCategory,
            null,
            0,
            false,
            this.userId);
        this.deckService.addDeck(newDeck).subscribe(
            (deck: Deck) => {
                console.log(deck);
                this.router.navigate(['./makeflashcards', 'edit', deck.deckId]);
            });
    }

/*
	onAddNewDeck(answer:number) {
		// This function fires when the user has made a selection on 
		// the add card modal. 
		// Possible answers:
		// 0) Cancel and do nothing 
		// 1) User wants to create his own deck, route to the edit screen
		// 2) User would like to clone one of the existing decks

	    // Get rid of the modal
		this.displayAddDeck = 'none';
		console.log('adding/cloning deck for: ' + this.newCategory + ' and ' + this.newDeckName);

		// Add a new deck
		if (answer === 1) {
			const newDeck = new Deck(this.newDeckName,               
			true,
			this.newCategory,
			null,
			0,
			false,
			this.userId); 
		this.deckService.addDeck(newDeck).subscribe(
			(deck: Deck) => {
				console.log(deck);
				this.router.navigate(['./makeflashcards', 'edit', deck.deckId]);
				});
						
			// Clone a deck
			} else if (answer === 2) {
				console.log('user wants to clone a deck');

				// Go to deckservice and get list of possible decks to clone 
				// to populate the dropdown list should look like
				console.log(this.cloneDeckList);
				console.log("Going to call getUnownedDecks");
				this.cloneDeckList = [];
				this.deckService.getUnownedDecks()
						.subscribe(
						(decks: Deck[]) => {
								console.log(decks);
								for (let deck of decks) {
										const deckName = deck.category+'-'+deck.name;
										this.cloneDeckList.push({id:deck.deckId, name:deckName});  
										}
								// Make the dropdown list show so the user can pick 
								// a deck to clone, when the user picks one, onClone() will fire  
								this.cloneDrop = true;
						});

			}

  }
*/
//     private onModalResponse(answer:number) {
//         // This function fires when the user has made a selection on 
//         // the add card modal. 
//         // Possible answers:
//         // 0) Cancel and do nothing 
//         // 1) User wants to create his own deck, route to the edit screen
//         // 2) User would like to clone one of the existing decks

//         //Get rid of the modal
//         if (answer == 1) {
//             // they want to make their own, go to the make-add component
//             this.display = 'none';
//             this.router.navigate(['./makeflashcards/', 'add']);
//         } else if (answer == 2) {
//             // Go to deckservice and get list of possible decks to clone 
//             // to populate the dropdown list should look like
//             console.log(this.cloneDeckList);
//             console.log("Going to call getUnownedDecks");
//             this.cloneDeckList = [];
//             this.deckService.getUnownedDecks()
//                 .subscribe(
//                 (decks: Deck[]) => {
//                     console.log(decks);
//                     for (let deck of decks) {
//                         const deckName = deck.category+'-'+deck.name;
//                         this.cloneDeckList.push({id:deck.deckId, name:deckName});  
//                         }
//                     // Make the dropdown list show so the user can pick 
//                     // a deck to clone  
//                     this.cloneDrop = true;
//                 });

//             }

//     }

    onClone() {
        // This function fires when the user chooses a deck to clone
        // this.cloneChoice is the id of the deck to clone
        // Because of the subscription to deckschanged, the list will show
        // the newly added cloned deck
        this.display = 'none';
        // const deckToClone: Deck = this.deckService.getDeck(this.cloneChoice);
        const deckToClone: Deck = this.deckService.getDeck(this.cloneChoice[0]);
        this.deckService.cloneDeck(deckToClone)
            .subscribe(
                (deck: Deck) => {
                    console.log(deck);
                    this.router.navigate(['./makeflashcards/', 'makelist', this.userId]);            
                });

    }
 
	onDelete() {
  	// Show the delete modal
    this.display = 'block';
  }

  onModalResponse(answer:boolean) {
    // Get rid of the modal
		this.display = 'none';
		console.log('onModalResponse just called');
		
    if (answer) {
      // Delete the deck
      this.deckService.deleteDeck(this.deck).subscribe(
        (deck: Deck) => {
          console.log(deck);
          // Navigate back to the list
          this.router.navigate(['./makeflashcards/', 'makelist', this.userId]);            
				});
		}
  }

	onEdit() {
		console.log(this.deck.deckId);
		this.router.navigate(['./makeflashcards', 'edit', this.deck.deckId]);
	}

	onFavorite() {
	    // Toggle favorite for this deck
	    this.deck.favorite = !this.deck.favorite;
	    this.deckService.updateDeck(this.deck).subscribe(
      		(deck: Deck) => {
        		console.log(deck);
					});
			this.isFavorite = this.deck.favorite;
			this.favTitle = this.isFavorite ? "Remove 'FAVORITE' status" : "Mark this deck as a 'FAVORITE'";			
	}
}
