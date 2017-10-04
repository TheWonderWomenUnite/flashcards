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
  hideThumbs = true;
  showQSide = true;
  showASide = false;
  currentCard: Card;
  nextCard: Card;
  previousCard: Card;
  isFavorite = false;
  progressPct = 0;
  anonymousPlay = false;

  // Q for Lisa: for now I used font-awesome icons instead of these png files because they 
  // were quickest for me to implement the sizing
  // Let me know if you prefer these imgs and I will figure out sizing them in footer, etc
  const backButton = "../img/back_button.png";
  const thumbsUp = "../img/thumbsUp.png";
  const thumbsDown = "../img/thumbsDown.png";

  const questionMark = "../img/questionMark.png";
  const rightCaret = "../img/right_caret.png";
  const leftCaret = "../img/left_caret.png";
  //displayBar = "";
  //displayHeart = "";

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
        this.anonymousPlay = !this.deck.userOwned;

        // Get the cards for this deck;
        console.log("Going to get cards");
				this.cardService.getCards(this.deck.deckId)
        	.subscribe((cards: Card[]) => {
            // we have our cards, shuffle them and initialize values 
            // to start the game
         		this.cards = cards;
            this.deckShuffle();
         		console.log(this.cards);
            this.faceUp = true;
            //this.displayBar = this.utilsService.progressBarPic(this.deck.progressBar);
            //this.displayHeart = this.utilsService.heartPic(this.deck.favorite);

            if (this.anonymousPlay) {
              this.progressPct = 0;
            }
            else {
              this.deck.lastPlayed = Date.now();
              this.updateDeckInfo(this.deck);
              this.progressPct = this.deck.progressBar;
              this.isFavorite = this.deck.favorite;
            }
            this.currentCard = this.cards[this.currIndex];
            this.nextCard = this.cards[this.currIndex + 1];
            this.previousCard = this.cards[this.cards.length-1];
            console.log("Current = "+this.currentCard.side1+
                        " next = "+this.nextCard.side1+
                        " prev = "+this.previousCard.side1);
            });
        });        
        console.log('at end of ngOnInit and hideThumbs is ' + this.hideThumbs);
  	}

  goNext(forward: boolean) {
    // This is how you go forward or back in the deck. For right now, if you reach 
    // the end of the deck and you are going forward, loop back to the beginning.
    // if you are going backward and you reach the beginning of the deck, loop
    // back to the end Just play until the user exits

    this.faceUp = true;
    this.displayThumbs = 'none';
    this.showQSide = true;
    this.showASide = false;
    this.hideThumbs = true;
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
    console.log('at end of goNext and hideThumbs is ' + this.hideThumbs)
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
    this.showASide = true;
    this.showQSide = false;
    this.faceUp = false;
    this.hideThumbs = false;
  }

  onThumbsUpOrDown(upOrDown: boolean) {
    // Click listener for Thumbs Up or Thumbs Down
    // If true, they pressed thumbs up, if false, they pressed thumbs down
    // Increment or decrement the progress bar
    // and slide left (I'm assuming that if the user does this they are 
    // done with the card)
    // Note: Length will never be 0 because you can't get here 
    // if there aren't any cards
    console.log('at start of onThumbsUpOrDown and hideThumbs is ' + this.hideThumbs);
    const incNumber = ((1/this.cards.length) * 100);
    this.progressPct = (upOrDown) ? 
    this.progressPct + incNumber : 
    this.progressPct - incNumber;

    if (this.progressPct > 100) {
      this.progressPct = 100; 
    } else if (this.progressPct < 0) {
      this.progressPct = 0; 
    }

    if (!this.anonymousPlay) {
      this.deck.progressBar = this.progressPct;
      this.updateDeckInfo(this.deck);      
    } 

    this.showQSide = true;
    this.showASide = false;
    this.faceUp = true;
    this.hideThumbs = true;
    //this.displayBar = this.utilsService.progressBarPic(this.deck.progressBar);
    this.goNext(true);
    console.log('at end of onThumbsUpOrDown and showASide is ' + this.showASide);
    console.log('at end of onThumbsUpOrDown and hideThumbs is ' + this.hideThumbs);
    
  }

 onHelp() {

    }

  onGoBack() {
    if (this.anonymousPlay) {
      this.router.navigate(['./playflashcards/', 'decklist']);      
      }
    else {
      this.router.navigate(['./playflashcards/', 'decklist', this.deck.userId]);
      }
    }

  onResetProgressBar() {
    this.progressPct = 0;
    if (!this.anonymousPlay) {
      this.deck.progressBar = 0; 
      this.updateDeckInfo(this.deck);
    }
    //this.displayBar = this.utilsService.progressBarPic(this.deck.progressBar);
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

  deckShuffle() {
    // Shuffle the deck so the cards are presented in a different order
    // than they are in the database

    tempCard: Card;

    for (var i = this.cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempCard = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = tempCard;
      }

    }

}
