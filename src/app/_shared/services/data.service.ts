import { Injectable } from '@angular/core';
import { MovieService } from './movie.service';
import { ReplaySubject } from 'rxjs';
import { CinemaService } from './cinema.service';
import { TypeOfTicketService } from './type-of-ticket.service';
import { ExibitionDayService } from './exibition-day.service';
import { RoomService } from './room.service';
import { ScheduleService } from './schedule.service';
import { TicketService } from './ticket.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public movies$: ReplaySubject<any[]> = new ReplaySubject(1);
  private movies: any[];
  public schedules$: ReplaySubject<any[]> = new ReplaySubject(1);
  public cinemas$: ReplaySubject<any[]> = new ReplaySubject(1);
  public allCinemas$:ReplaySubject<any[]> = new ReplaySubject(1);
  public cinemaMovies$: ReplaySubject<any[]> = new ReplaySubject(1);
  public typeOfTickets$: ReplaySubject<any[]> = new ReplaySubject(1);
  public exibitionDays$: ReplaySubject<any[]> = new ReplaySubject(1);
  public rooms$: ReplaySubject<any[]> = new ReplaySubject(1);
  public availableSeats$: ReplaySubject<any[]> = new ReplaySubject(1);
  public structure$: ReplaySubject<any[]> = new ReplaySubject(1);

  constructor(private _movieService: MovieService,
    private _cinemaService: CinemaService,
    private _typeOfTicketService: TypeOfTicketService,
    private _exibitionDaysService: ExibitionDayService,
    private _roomService: RoomService,
    private _scheduleService: ScheduleService,) {
    this.updateMovies();
  }

  public allCinemas() {
    this._cinemaService.allCinemas().subscribe((res: any) => {
      this.allCinemas$.next(res);
    });
  }

  public cinemaMovies(id) {
    this._roomService.getCinemaMovies(id).subscribe((res: any) => {
      this.cinemaMovies$.next(res);
    });
  }

  public updateMovies() {
    this._movieService.getMovies().subscribe((res: any) => {
      this.movies$.next(res);
      this.movies = res;
    });
  }

  public getMovieByID(id) {
    if (this.movies !== undefined)
      for (const movie of this.movies) {
        if (movie.id === id) {
          return movie;
        }
      }
  }

  public getSchedule(id) {
    this._movieService.getSchedulefromRoom(id).subscribe((res: any) => {
      this.schedules$.next(res);
    });
  }

  public getCinemas(id) {
    this._cinemaService.getCinemas(id).subscribe((res: any) => {
      this.cinemas$.next(res);
    });
  }

  public getTypeOfTickets(id) {
    this._typeOfTicketService.getTypeOfTickets(id).subscribe((res: any) => {
      this.typeOfTickets$.next(res);
    });
  }

  public getRooms(idMovie, idCinema) {
    this._roomService.getRoom(idMovie, idCinema).subscribe((res: any) => {
      this.rooms$.next(res);
    });
  }

  public getExibitionDayfromRoom(id) {
    this._exibitionDaysService.getExibitionDayfromRoom(id).subscribe((res: any) => {
      this.exibitionDays$.next(res);
    });
  }

  public getAvailableSeats(idCinema, idMovie, idSchedule) {
    this._scheduleService.getAvailableSeats(idCinema, idMovie, idSchedule).subscribe((res: any) => {
      this.availableSeats$.next(res);
    });
  }

  public getStructure(idCinema, idMovie, idSchedule) {
    this._scheduleService.getStructure(idCinema, idMovie, idSchedule).subscribe((res: any) => {
      this.structure$.next(res);
    });
  }

}
