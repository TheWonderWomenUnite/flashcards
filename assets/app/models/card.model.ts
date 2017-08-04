export class Card {
    side1: string;
    side2: string;
    deckId: number;

    constructor(side1: string, side2: string, deckId?: string) 
    {
        this.side1 = side1;
        this.side2 = side2;
        this.deckId = deckId;
    }
}

