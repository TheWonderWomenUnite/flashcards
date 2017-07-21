export class Deck {
    
	name: string;
	userOwned: boolean;
	category: string;
    deckId?: string;
	userId?: string;
	
     constructor(
        name: string, 
        userOwned: boolean, 
        category: string, 
        deckId?: string,
        userId?: string
        ) {
        this.name = name;
        this.userOwned = userOwned;
        this.category = category;
        this.deckId = deckId;
        this.userId = userId;
    }
}