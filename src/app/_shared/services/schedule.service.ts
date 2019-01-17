import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient: HttpClient) { }

  public getAvailableSeats(idCinema, idMovie, idSchedule){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/schedule/availableseats/'+idCinema+'+'+idMovie+'+'+idSchedule);
  }  

  public getStructure(idCinema, idMovie, idSchedule){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/schedule/structure/'+idCinema+'+'+idMovie+'+'+idSchedule);

  }

  public postStructure(structure){
    return this.httpClient.put('http://localhost:8080/CinemaTicketSystem/api/schedule/structure/update',structure);
  }
 
}
