import { Routes } from '@angular/router';

import { DeckEditComponent } from './deck-edit.component';
import { DeckAddComponent } from './deck-add.component';
import { DeckPlayComponent } from './deck-play.component';

// Routes are relative to "/auth"
export const flashcard_routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },
	{ path: ':id/edit', component: DeckEditComponent },
	{ path: 'add', component: DeckAddComponent },
	{ path: ':id/play', component: DeckPlayComponent }
];

@NgModule({
	imports: [RouterModule.forChild(flashcard_routes)
	],
	exports: [RouterModule]
})
export class FlashcardRoutingModule {}