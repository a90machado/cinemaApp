import { Injectable } from '@angular/core';
import { MovieService } from './movie.service';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public movies$: ReplaySubject<any[]> = new ReplaySubject(1);
  private movies: any[];

  constructor(private _movieService: MovieService) {
    this.updateMovies();
  }

  public updateMovies() {
    this._movieService.getMovies().subscribe((res: any) => {
      this.movies$.next(res);
      this.movies = res;
    });
  }

  public getMovieByID(id) {
    for (const movie of this.movies) {
      if (movie.id === id) {
        return movie;
      }
    }
  }
}
