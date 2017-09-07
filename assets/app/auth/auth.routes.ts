import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { LogoutComponent } from './logout.component';


// Routes are relative to "/auth"

// LMC: The default behaviour is to go to the signin page

export const auth_routes: Routes = [
	{ path: '', redirectTo: 'signin', pathMatch: 'full' },
	{ path: 'signup', component: SignupComponent },
	{ path: 'signin', component: SigninComponent },
	{ path: 'logout', component: LogoutComponent }
];

//LMC: Added in the NgModule statement and the export (Not sure why these weren't there?)

@NgModule({
	imports: [RouterModule.forChild(auth_routes)],
	exports: [RouterModule]
})

export const AuthRouting = RouterModule.forChild(auth_routes);