import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeFlashCardsComponent } from './make-flash-cards.component';
import { MakeEditComponent } from './make-edit.component';
import { MakeAddComponent } from './make-add.component';

// Routes are relative to "/auth"
export const makecard_routes: Routes = [
	{ path: '', redirectTo: 'MakeFlashCardsComponent', pathMatch: 'full' },
	{ path: 'edit/:id', component: MakeEditComponent },
	{ path: 'add', component: MakeAddComponent }
];

@NgModule({
	imports: [RouterModule.forChild(makecard_routes)],
	exports: [RouterModule]
})
export class MakeCardRoutingModule {}