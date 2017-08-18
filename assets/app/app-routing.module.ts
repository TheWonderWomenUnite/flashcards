import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeFlashCardsComponent } from './make-flash-cards/make-flash-cards.component';
import { PlayFlashCardsComponent } from './play-flash-cards/play-flash-cards.component';
import { AuthenticationComponent } from "./auth/authentication.component";

// DMZ: help? not sure about these two lines I added - similar already in auth.routes
import { SigninComponent } from "./auth/signin.component";
import { SignupComponent } from "./auth/signup.component";

import { auth_routes } from './auth/auth.routes';
import { flashcard_routes } from './play-flash-cards/flashcard.routes';
import { makecard_routes } from './make-flash-cards/makecard.routes';

const appRoutes: Routes = [
	// { path: '', redirectTo: '/auth', pathMatch: 'full' },
	// { path: 'auth', component: AuthenticationComponent, children: auth_routes },
	{ path: 'auth/signin', component: SigninComponent, children: auth_routes },
	{ path: 'auth/signup', component: SignupComponent, children: auth_routes },
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