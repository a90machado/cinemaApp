import { Injectable } from '@angular/core';
import { MovieService } from './movie.service';
import { ReplaySubject } from 'rxjs';
import { CinemaService } from './cinema.service';
import { TicketService } from './ticket.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public movies$: ReplaySubject<any[]> = new ReplaySubject(1);
  private movies: any[];
  public schedules$: ReplaySubject<any[]> = new ReplaySubject(1);
  private schedules: any[];
  public cinemas$: ReplaySubject<any[]> = new ReplaySubject(1);
  private cinemas: any[];
  public tickets$: ReplaySubject<any[]> = new ReplaySubject(1);
  private tickets: any[];

  constructor(private _movieService: MovieService,
              private _cinemaService: CinemaService,
              private _ticketService: TicketService) {
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

  public getSchedule(id) {
    this._movieService.getSchedulefromRoom(id).subscribe((res: any) => {      
      this.schedules$.next(res);        
      this.schedules = res;      
    });    
  }
  
  public getCinemas(){
    this._cinemaService.getCinemas().subscribe((res: any) => {
      this.cinemas$.next(res);
      this.cinemas = res;      
    });
  }

  public getTickets(){
  this._ticketService.getTickets().subscribe((res:any) => {
    this.tickets$.next(res);
    this.tickets = res;
  });
   
  }

}
