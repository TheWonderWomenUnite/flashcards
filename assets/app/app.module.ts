import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';

import { PlayFlashCardsComponent } from './play-flash-cards/play-flash-cards.component';
import { DeckListComponent } from './play-flash-cards/deck-list.component';
import { DeckDetailComponent } from './play-flash-cards/deck-detail.component';
import { DeckPlayComponent } from './play-flash-cards/deck-play.component';

import { MakeFlashCardsComponent } from './make-flash-cards/make-flash-cards.component';
import { MakeListComponent } from './make-flash-cards/make-list.component';
import { MakeDetailComponent } from './make-flash-cards/make-detail.component';
import { MakeEditComponent } from './make-flash-cards/make-edit.component';
import { MakeAddComponent } from './make-flash-cards/make-add.component';

import { AuthenticationComponent } from "./auth/authentication.component";
import { LogoutComponent } from "./auth/logout.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";

import { AuthService } from './auth/auth.service';
import { DeckService } from './shared/deck.service';
import { CardService } from './shared/card.service';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    MakeFlashCardsComponent,
    PlayFlashCardsComponent,
    DeckListComponent,
    DeckDetailComponent,
    DeckPlayComponent,
    MakeListComponent,
    MakeDetailComponent,
    MakeEditComponent,
    MakeAddComponent,
    AuthenticationComponent,
    LogoutComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [AuthService, ErrorService, DeckService],
  bootstrap: [AppComponent]
})
export class AppModule { }
