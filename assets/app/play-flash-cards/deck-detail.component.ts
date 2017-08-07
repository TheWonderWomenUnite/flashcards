import { Component, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";

@Component({
    selector: 'app-deck-detail',
    templateUrl: './deck-detail.component.html'    
})

export class DeckDetailComponent {
    @Input() deck: Deck;

   	constructor(private deckService: DeckService,
				private route: ActivatedRoute,
				private router: Router) { }

	onPlay() {
		this.router.navigate(['./', 'play', this.deck.deckId], {relativeTo: this.route});

	}
}
