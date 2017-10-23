import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeFlashCardsComponent } from './make-flash-cards/make-flash-cards.component';
import { PlayFlashCardsComponent } from './play-flash-cards/play-flash-cards.component';
import { AuthenticationComponent } from "./auth/authentication.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AboutComponent } from "./about/about.component";

import { auth_routes } from './auth/auth.routes';
import { flashcard_routes } from './play-flash-cards/flashcard.routes';
import { makecard_routes } from './make-flash-cards/makecard.routes';

/**
* The main routing for the flashcard app.
* 
* Welcome displays a welcome message on the screen after login
* Auth contains the routes for logging in, logging out, and signing up users
* MakeFlashCards allows the user to create and edit decks of flashcards
* PlayFlashCards displays the flashcards for either the logged in user or an
* anonymous user
*
*/
const appRoutes: Routes = [
	// { path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{ path: 'welcome', component: WelcomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'auth', component: AuthenticationComponent, children: auth_routes },
	{ path: 'makeflashcards', component: MakeFlashCardsComponent, children: makecard_routes },
  { path: 'playflashcards', component: PlayFlashCardsComponent, children: flashcard_routes },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [RouterModule]
})

export class AppRoutingModule {

}
