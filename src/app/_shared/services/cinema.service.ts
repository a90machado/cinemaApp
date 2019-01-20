import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(private httpClient: HttpClient) { }

  public getCinemas(id){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/cinema/movie/'+id);
  }

  public allCinemas(){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/cinema');
  }
}
