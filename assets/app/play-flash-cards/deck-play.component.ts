// This component contains the actual flashcard playing
// This is routed to from deckdetail and contains a parameter with 
// the deck ID

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { Card } from "../models/card.model";
import { CardService } from '../shared/card.service';
import { DeckService } from '../shared/deck.service';
import { UtilsService } from '../shared/utils.service';

@Component({
    selector: 'app-deck-play',
    templateUrl: './deck-play.component.html',
    styleUrls: ['./deck-play.component.css']
})

export class DeckPlayComponent implements ngOnInit {

  deck: Deck;
  cards: Card[];
  currIndex = 0;
  faceUp = true;
  displayThumbs = 'none';
  currentCard: Card;
  nextCard: Card;
  previousCard: Card;
  const backButton = "../img/back_button.png";
  const thumbsUp = "../img/thumbsUp.png";
  const thumbsDown = "../img/thumbsDown.png";
  const heartFilled = "../img/heart_filled.png";
  const heartUnfilled = "../img/heart_unfilled.png";
  const questionMark = "../img/questionMark.png";
  const rightCaret = "../img/right_caret.png";
  const leftCaret = "../img/left_caret.png";
  displayBar = "../img/progressbarstart.png";

	constructor(private route: ActivatedRoute,
              private router: Router,
              private cardService: CardService,
              private deckService: DeckService,
              private utilsService: UtilsService) { }

	ngOnInit() {
		this.route.params
			.subscribe((params: Params) =>{

        // Get the deck Id from the route parameters
				const deckId = params['id'];
        this.deck = this.deckService.getDeck(deckId);

        // Get the cards for this deck;
        console.log("Going to get cards");
				this.cardService.getCards(this.deck.deckId)
        	.subscribe((cards: Card[]) => {
            // we have our cards, initialize values to start the game
         		this.cards = cards;
         		console.log(this.cards);
            this.faceUp = true;
            this.deck.lastPlayed = Date.now();
            this.updateDeckInfo(this.deck);
            this.updateProgressBar();
            this.currentCard = this.cards[this.currIndex];
            this.nextCard = this.cards[this.currIndex + 1];
            this.previousCard = this.cards[this.cards.length-1];
            console.log("Current = "+this.currentCard.side1+
                        " next = "+this.nextCard.side1+
                        " prev = "+this.previousCard.side1);
            });
				});

  	}

  goNext(forward: boolean) {
    // This is how you go forward or back in the deck. For right now, if you reach 
    // the end of the deck and you are going forward, loop back to the beginning.
    // if you are going backward and you reach the beginning of the deck, loop
    // back to the end Just play until the user exits

    this.faceUp = true;
    this.displayThumbs = 'none';
    const lastCard = this.cards.length - 1;

    // First advance or retreat the currIndex, if it is at the end, loop back to 

    if forward {
      if (this.currIndex == lastCard) {
        this.currIndex = 0;
      } else {
        this.currIndex++;
      }
    } else {
      if (this.currIndex == 0) {
        this.currIndex = lastCard;
      } else {
        this.currIndex--;
      }

    } 

    // Set currentCard
    this.currentCard = this.cards[this.currIndex]; 

    // Set nextCard, if you are at the end, next card is the first card
    if (this.currIndex == lastCard) {             
      this.nextCard = this.cards[0];
      this.previousCard = this.cards[this.currIndex - 1];
    } else if (this.currIndex == 0) {
      this.previousCard = this.cards[lastCard];
      this.nextCard = this.cards[this.currIndex + 1];
    } else {
      this.previousCard = this.cards[this.currIndex - 1];
      this.nextCard = this.cards[this.currIndex + 1];
    }
  }

  onSlideLeft() {
    // User pressed the <- arrow
    this.goNext(false);
  } 

  onSlideRight() {
    // User pressed the -> arrow
    this.goNext(true);
  } 

  showAnswer() {
    
    this.faceUp = false;
    this.displayThumbs = 'block';
  }

  onThumbsUpOrDown(upOrDown: boolean) {
    // Click listener for Thumbs Up or Thumbs Down
    // If true, they pressed thumbs up, if false, they pressed thumbs down
    // Increment or decrement the progress bar
    // and slide left (I'm assuming that if the user does this they are 
    // done with the card)
    // Note: Length will never be 0 because you can't get here 
    // if there aren't any cards

    const incNumber = ((1/this.cards.length) * 100);

    console.log("Number of cards = "+ this.cards.length+ 
      " incNumber = "+ incNumber+
      " before math, prog bar = "+this.deck.progressBar);

    this.deck.progressBar = (upOrDown) ? 
      this.deck.progressBar + incNumber : 
      this.deck.progressBar - incNumber;

    if (this.deck.progressBar > 100) {
      this.deck.progressBar = 100; 
    } else if (this.deck.progressBar < 0) {
      this.deck.progressBar = 0; 
    }

    this.updateDeckInfo(this.deck);
    this.updateProgressBar();
    this.goNext(true);
  }

  updateProgressBar() {
    if (this.deck.progressBar < 20) {
      this.displayBar = "../img/progressbarstart.png";
    }
    else if (this.deck.progressBar < 40) {
      this.displayBar = "../img/progressbar20.png";
    }
    else if (this.deck.progressBar < 60) {
      this.displayBar = "../img/progressbar40.png";
    }
    else if (this.deck.progressBar < 80) {
      this.displayBar = "../img/progressbar60.png";
    }
    else if (this.deck.progressBar < 100) {
      this.displayBar = "../img/progressbar80.png";
    }
    else {
      this.displayBar = "../img/progressbar100.png"; 
    }


  }

/*
  onAdd() {
    // Add a new card to this deck - keeping for testing purposes

    const side1 = this.utilsService.randomString(10);
    const side2 = this.utilsService.randomString(10);
    const newCard = new Card(side1, side2, this.deck.deckId);
    this.cardService.addCard(newCard).subscribe(
      (card: Card) => {
        console.log(card);
        // Update my local card array
        this.cards.push(card);
      });
  } 
*/
  onFavorite() {
    // Toggle favorite for this deck
    this.deck.favorite = !this.deck.favorite;
    this.updateDeckInfo(this.deck);

    }

    onHelp() {

    }

    onGoBack() {
      this.router.navigate(['./playflashcards/', 'decklist', this.deck.userId]);
    }

  updateDeckInfo() {
    // Update the database with new info for the deck. This is called 
    // When the progress bar is updated, to update lastPlayed, and 
    // when the user chooses to favorite or unfavorite this deck

    const editDeck = new Deck(
    this.deck.name, 
    this.deck.userOwned, 
    this.deck.category,
    this.deck.lastPlayed,
    this.deck.progressBar,
    this.deck.favorite,
    this.deck.userId,
    this.deck.deckId);
    
    this.deckService.updateDeck(editDeck).subscribe(
      (deck: Deck) => {
        console.log(deck);
      });

    }

}