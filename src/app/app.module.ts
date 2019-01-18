import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DetailsPosterComponent, DetailsPremiereComponent } from './_shared';
import { MatStepperModule, MatIconModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { ScheduleDayPipe } from './_shared/components/details-poster/schedule-day.pipe';
import { StructurePipePipe } from './_shared/components/details-poster/structure-pipe.pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsPosterComponent,
    DetailsPremiereComponent,
    NotfoundComponent,
    ScheduleDayPipe,
    StructurePipePipe,
  ],
  imports: [
    BrowserModule,
    CarouselModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    MatStepperModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AngularFontAwesomeModule       
  ],
  entryComponents: [],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
