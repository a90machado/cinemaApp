import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailsPremiereComponent } from './details-premiere/details-premiere.component';
import { DetailsPosterComponent } from './details-poster/details-poster.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsPremiereComponent,
    DetailsPosterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
