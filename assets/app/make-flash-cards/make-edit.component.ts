import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Deck } from "../models/deck.model";
import { Card } from "../models/card.model";
import { DeckService } from "../shared/deck.service";
import { CardService } from "../shared/card.service";



@Component({
  selector: 'app-make-edit',
  templateUrl: './make-edit.component.html',
  styleUrls: ['./make-edit.component.css']
})

export class MakeEditComponent implements OnInit {
	deckForm: FormGroup;
  readyForm = false;
  editMode = false;
  deck: Deck;
  cards: Card[];
  id: string;
  userId: string;
  display = 'none'; // For the are you sure modal
  liveCard = 0;

	constructor(private route: ActivatedRoute,
      			  private deckService: DeckService,
              private cardService: CardService,
        		  private router: Router) { }

	ngOnInit() {
      this.userId = localStorage.getItem('UserId');
  		this.route.params
  			.subscribe(
  				(params: Params) =>{
            this.id = params['id'];
            this.editMode = params['id'] != null;
            if (this.editMode) {
              this.deck = this.deckService.getDeck(this.id);
              this.cardService.getCards(this.deck.deckId)
                .subscribe((cards: Card[]) => {
                this.cards = cards; 
                // this.liveEditArr = Array(cards.length).fill(false);
                // console.log('in init and live');
                console.log("have the cards, calling initform");
                this.initForm(); 
                });
              }  
            else {
              this.initForm();
            }
      		});
  	}

  onSubmit() {

    if (this.editMode) {
      // Editing a deck, get all of the values from this.deck except
      // the ones that can be modified, ie name and category
      const editDeck = new Deck(
        this.deckForm.value.name, 
        this.deck.userOwned, 
        this.deckForm.value.category,
        this.deck.lastPlayed,
        this.deck.progressBar,
        this.deck.favorite,
        this.deck.userId,
        this.deck.deckId);
      this.deckService.updateDeck(editDeck).subscribe(
      (deck: Deck) => {
        console.log(deck);
        this.saveCards();
      });

    } else {
      // Creating a new deck, initialize all values except the ones the user
      // can fill in, ie name and category  

      const editDeck = new Deck(
        this.deckForm.value.name, 
        true,
        this.deckForm.value.category,
        null,
        0,
        false,
        this.userId,
      );

      this.deckService.addDeck(editDeck).subscribe(
      (deck: Deck) => {
        console.log(deck);
        this.deck = deck;
        this.saveCards();
      });
    }

    this.onExit();
  }

  saveCards() {

    // Current method for saving the cards for this deck. Brute force method
    // that could potentially be optimized in the future. 
    // Step 1) Extract the cards from the form into an array 
    // Step 2) Delete all of this deck's currently saved cards
    // Step 3) Add all of the cards that are in the form as new records

    console.log("Savecards: "+this.deckForm.value.cards);
    let formCards = this.deckForm.value.cards;
    
    console.log("formCards.length = "+formCards.length); 

    // Only need to do this if there are cards, obvs
    if (formCards.length > 0) {
      // first delete all of this deck's current cards
      this.cardService.deleteAllCards(this.deck.deckId).subscribe(
        (card: Card) => {

          // Now add all of the current cards from the form array  
          for (let card of formCards) {
            const thisCard = new Card(
              card.side1,
              card.side2,
              this.deck.deckId);
            this.cardService.addCard(thisCard).subscribe(
              (card: Card) => {
              console.log(card);
            });                              
          }
          this.onExit();
        });
    } else {
      this.onExit();
    }
  }

  onCancel() {
    // Ask if they want to leave if they have made changes
    if (this.deckForm.dirty) {
      this.display = 'block';
    } else {
      this.onExit();
    }  
  }

  onModalResponse(answer:boolean) {
    // Get rid of the modal
    this.display = 'none';
    if (answer) {
      // They want to leave even though there are changes
      // Just throwing away the changes
      this.onExit();
    }
  }

  // isLive(index: number) {
  //   return (this.liveCard === index);
  // }
  
  onExit() {
    this.router.navigate(['./makeflashcards', 'makelist', this.userId]);     
  }

  onAddCard() {
    // Ask Lisa - any issue that I changed this to insert(0) to show at front of list?
    // Lisa had:
    // (<FormArray>this.deckForm.get('cards')).push(
    
    (<FormArray>this.deckForm.get('cards')).insert((0),
      new FormGroup({
        'side1': new FormControl(null, Validators.required),
        'side2': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteCard(index: number) {

    (<FormArray>this.deckForm.get('cards')).removeAt(index);
  }

  getControls() {
    return (<FormArray>this.deckForm.get('cards')).controls;
  }

 private initForm() {

    let deckName = '';
    let category = '';
    let cardDeck: Card[] = [];
    let cardsForm = new FormArray([]);

    if (this.editMode) {
      deckName = this.deck.name;
      category = this.deck.category;
      
      for (let card of this.cards) {
        cardsForm.push(
          new FormGroup({
            'side1': new FormControl(card.side1),
            'side2': new FormControl(card.side2)
            })
          );
        }  
      }          

    this.deckForm = new FormGroup({
      'name': new FormControl(deckName, Validators.required),
      'category': new FormControl(category, Validators.required),
      'cards': cardsForm
      });  
    this.readyForm = true;        
  } 
}