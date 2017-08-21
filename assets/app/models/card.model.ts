// This is the client side model for the flashcards
// side1 - The data on the front of the flashcard
// side2 - The data on the back of the flashcard
// deckId - the id for the deck this card belongs to from the server 
// side mongoose model
// cardId - The unique id for this card from the server 
// side mongoose model

export class Card {
    constructor(public side1: string, 				
    			public side2: string,
				public deckId: string,
				public cardId?: string) {}
}

