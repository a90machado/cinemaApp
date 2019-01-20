import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  constructor(private httpClient: HttpClient) { }

  public getMovies(){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/movie');
  } 
 
  public getSchedulefromRoom(id){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/movie/room/schedules/'+id)
  }
}
