import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient) { }

  public getRoom(idMovie,idCinema){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/room/movie/'+idMovie+'+'+idCinema)

  }

  public getCinemaMovies(id){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/room/cinema/movies/'+id);
  }
}
