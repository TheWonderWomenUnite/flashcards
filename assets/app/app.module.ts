import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';
import { MakeFlashCardsComponent } from './make-flash-cards/make-flash-cards.component';
import { PlayFlashCardsComponent } from './play-flash-cards/play-flash-cards.component';
import { DeckListComponent } from './play-flash-cards/deck-list.component';
import { DeckDetailComponent } from './play-flash-cards/deck-detail.component';
import { DeckEditComponent } from './play-flash-cards/deck-edit.component';
import { DeckAddComponent } from './play-flash-cards/deck-add.component';
import { DeckPlayComponent } from './play-flash-cards/deck-play.component';
import { AuthenticationComponent } from "./auth/authentication.component";
import { LogoutComponent } from "./auth/logout.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { AuthService } from './auth/auth.service';
import { DeckService } from './decks/deck.service';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    MakeFlashCardsComponent,
    PlayFlashCardsComponent,
    DeckListComponent,
    DeckDetailComponent,
    DeckEditComponent,
    DeckAddComponent,
    DeckPlayComponent,
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
