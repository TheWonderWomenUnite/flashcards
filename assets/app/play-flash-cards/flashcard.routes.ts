import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayFlashCardsComponent } from './play-flash-cards.component';
import { DeckEditComponent } from './deck-edit.component';
import { DeckAddComponent } from './deck-add.component';
import { DeckPlayComponent } from './deck-play.component';
import { DeckListComponent } from './deck-list.component';

// Routes are relative to "/auth"
export const flashcard_routes: Routes = [
	{ path: '', redirectTo: 'PlayFlashCardsComponent', pathMatch: 'full' },
	{ path: 'edit/:id', component: DeckEditComponent },
	{ path: 'add', component: DeckAddComponent },
	{ path: 'play/:id', component: DeckPlayComponent }
];

@NgModule({
	imports: [RouterModule.forChild(flashcard_routes)],
	exports: [RouterModule]
})
export class FlashcardRoutingModule {}