import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient: HttpClient) { }

  public getAvailableSeats(id){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/schedule/availableseats/'+id);
  }  
 
}
