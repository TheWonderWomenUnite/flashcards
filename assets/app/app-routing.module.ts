import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeFlashCardsComponent } from './make-flash-cards/make-flash-cards.component';
import { PlayFlashCardsComponent } from './play-flash-cards/play-flash-cards.component';
import { AuthenticationComponent } from "./auth/authentication.component";
import { auth_routes } from './auth/auth.routes';
import { flashcard_routes } from './play-flash-cards/flashcard.routes';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/auth', pathMatch: 'full' },
	{ path: 'auth', component: AuthenticationComponent, children: auth_routes },
	{ path: 'makeflashcards', component: MakeFlashCardsComponent },
	{ path: 'playflashcards', component: PlayFlashCardsComponent, children: flashcard_routes },
];

@NgModule({
	imports: [
		// RouterModule.forRoot(appRoutes, {useHash: true})
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule]
})

export class AppRoutingModule {

}