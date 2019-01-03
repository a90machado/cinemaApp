import { Injectable } from '@angular/core';
import { Movie } from '../models';
import { MovieService } from './movie.service';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators/';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public movies$: ReplaySubject<any[]> = new ReplaySubject(1);

  constructor(private _movieService: MovieService) {
    this.updateMovies();
  }

  public updateMovies() {
    this._movieService.getMovies().subscribe((res: any) => {
      this.movies$.next(res);
    });
  }

  public getMovieByID(id){
    this.movies$.pipe(
      map((data: any[])=>{
        for (let index = 0; index < data.length; index++) {
          if(id === data[index].id){
            return data;
           }        
        }       
      })
    );
    return null;
  }
}
