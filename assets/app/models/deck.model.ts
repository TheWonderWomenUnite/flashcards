// This is the client side model for the deck object
// name: The name of this deck, i.e. Addition
// userOwned: Boolean value indicating whether this deck belongs to a user or is a 
// "common" deck available for cloning
// category: The category this deck belongs to, i.e. Mathematics, also used
// for sorting
// lastPlayed: Date when the deck was last played, used for sorting
// progressBar: a value from 0-100 indicating how well the user understands
// the facts of this deck
// favorite: Boolean value indicating whether the user has chosen to mark this
// deck as a favorite, used for sorting
// userId: The unique identifier for the user who owns this deck
// deckId: The unique identifier for this deck

export class Deck {

    constructor(public name: string,               
                public userOwned: boolean,
                public category: string,
               	public lastPlayed: date,
				public progressBar: number,
				public favorite: boolean,
                public userId?: string,
                public deckId?: string
                ) {}

}