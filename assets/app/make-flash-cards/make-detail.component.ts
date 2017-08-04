import { Component, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Deck } from "../models/deck.model";
import { DeckService } from "../shared/deck.service";

@Component({
    selector: 'app-make-detail',
    templateUrl: './make-detail.component.html'    
})

export class MakeDetailComponent {
    @Input() deck: Deck;

   	constructor(private deckService: DeckService,
				private route: ActivatedRoute,
				private router: Router) { }


	onDelete() {
  		// this.deckService.deleteDeck(this.deck);
  		this.router.navigate(['./']);
	}

	onAdd() {
		this.router.navigate(['./', 'add'], {relativeTo: this.route});		
	}

	onEdit() {
		this.router.navigate(['./', 'edit', this.deck.deckId], {relativeTo: this.route});

	}

}
