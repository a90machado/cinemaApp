import { NgModule } from '@angular/core';
import { DetailsPosterComponent, DetailsPremiereComponent } from './components';

@NgModule({})
export class SharedModule {
    static forRoot() {
        return{
            ngModule: SharedModule,
            providers: [
                DetailsPosterComponent,
                DetailsPremiereComponent
            ]
        }
    }
}
export * from './components';
export * from './models';
