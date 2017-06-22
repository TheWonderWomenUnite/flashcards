import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MakeFlashCardsComponent } from './make-flash-cards/make-flash-cards.component';
import { PlayFlashCardsComponent } from './play-flash-cards/play-flash-cards.component';
import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'makeflashcards', canActivate: [AuthGuard], component: MakeFlashCardsComponent },
	{ path: 'playflashcards', canActivate: [AuthGuard], component: PlayFlashCardsComponent },
	{ path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not Found'}}

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