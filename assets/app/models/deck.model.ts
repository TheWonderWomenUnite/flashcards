export class Deck {
    
	name: string;
	userOwned: boolean;
	category: string;
	userId: string;
	
     constructor(name: string, userOwned: boolean, category: string, userId?: string) {
        this.name = name;
        this.userOwned = userOwned;
        this.category = category;
        this.userId = userId;
    }
}