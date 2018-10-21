import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// this is our first component
import { HeroesComponent } from './heroes/heroes.component';

import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { LocationsComponent } from './locations/locations.component'; // <-- NgModel lives here

// @NgModule.declarations array.
@NgModule({
  declarations: [
    // The component classes must be declared here
    AppComponent,
    // this is a custom component
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    LocationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
