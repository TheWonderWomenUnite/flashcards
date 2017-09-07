import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeFlashCardsComponent } from './make-flash-cards.component';
import { MakeEditComponent } from './make-edit.component';
import { MakeAddComponent } from './make-add.component';
import { MakeListComponent } from './make-list.component';
import { MakeStartComponent } from './make-start.component';

// Routes are relative to "/make-flash-cards"
// The default path is the MakeFlashCardsComponent which goes to the list
// makelist and add take the userId as the parameter
// edit takes the deckId as the parameter

export const makecard_routes: Routes = [
		{ path: '', redirectTo: 'MakeStartComponent', pathMatch: 'full' },
		{ path: 'start', component: MakeStartComponent },
		{ path: 'edit/:id', component: MakeEditComponent },
		{ path: 'add', component: MakeEditComponent }
	];

@NgModule({
	imports: [RouterModule.forChild(makecard_routes)],
	exports: [RouterModule]
})
export class MakeCardRoutingModule {}

