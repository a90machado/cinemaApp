import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsPosterComponent } from './_shared/components/details-poster/details-poster.component';
import { DetailsPremiereComponent } from './_shared/components/details-premiere/details-premiere.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'detailsposter/:id',
    component: DetailsPosterComponent, 
  },
  {
    path: 'detailspremiere',
    component: DetailsPremiereComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
