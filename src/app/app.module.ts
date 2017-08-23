import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayersComponent } from './components/players.component';
import { DeckComponent } from './components/deck.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    DeckComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
