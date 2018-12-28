import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailsPosterComponent, DetailsPremiereComponent } from './_shared';
import { StepsComponent } from './_shared/components/steps/steps.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsPosterComponent,
    DetailsPremiereComponent,
    NotfoundComponent,
    StepsComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
