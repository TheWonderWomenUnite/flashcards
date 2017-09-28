import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeFlashCardsComponent } from './make-flash-cards/make-flash-cards.component';
import { PlayFlashCardsComponent } from './play-flash-cards/play-flash-cards.component';
import { AuthenticationComponent } from "./auth/authentication.component";
import { WelcomeComponent } from "./welcome/welcome.component";

import { auth_routes } from './auth/auth.routes';
import { flashcard_routes } from './play-flash-cards/flashcard.routes';
import { makecard_routes } from './make-flash-cards/makecard.routes';

const appRoutes: Routes = [
	// DMZ I commented this out - couldn't figure out another way to prevent auth comp from displaying at start
	// LMC - added this back in so that when the app is first opened it goes 
	// to the signin page
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{ path: 'welcome', component: WelcomeComponent },
	{ path: 'auth', component: AuthenticationComponent, children: auth_routes },
	{ path: 'makeflashcards', component: MakeFlashCardsComponent, children: makecard_routes },
	{ path: 'playflashcards', component: PlayFlashCardsComponent, children: flashcard_routes }
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