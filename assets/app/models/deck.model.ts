export class Deck {

    constructor(public name: string,               
                public userOwned: boolean,
                public category: string,
                public userId?: string,
                public deckId?: string
                ) {}

}