import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DeckListComponent } from './deck-list.component';

@Component({
  selector: 'app-play-flash-cards',
  templateUrl: './play-flash-cards.component.html',
  styleUrls: ['./play-flash-cards.component.css']
})

export class PlayFlashCardsComponent {
// The main component for the PlayFlashCards Module

  constructor(private route: ActivatedRoute,
			  private router: Router) { }
  
}
