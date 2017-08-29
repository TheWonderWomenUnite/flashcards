import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayFlashCardsComponent } from './play-flash-cards.component';
import { DeckPlayComponent } from './deck-play.component';
import { DeckListComponent } from './deck-list.component';

// Routes are relative to "/play-flash-cards"
export const flashcard_routes: Routes = [
	{ path: '', redirectTo: 'PlayFlashCardsComponent', pathMatch: 'full' },
	{ path: 'decklist/:id', component: DeckListComponent },
	{ path: 'play/:id', component: DeckPlayComponent }
];

@NgModule({
	imports: [RouterModule.forChild(flashcard_routes)],
	exports: [RouterModule]
})

export class FlashcardRoutingModule {}