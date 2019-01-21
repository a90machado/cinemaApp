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

  public postStructure(schedule, roomId, quantity){
    return this.httpClient.put('http://localhost:8080/CinemaTicketSystem/api/schedule/'+roomId+'+'+quantity, schedule).subscribe( () => {
      // on sucess without return       
      }, err => {
      // on error
        console.log(err);
      }
    )
  }
 
}
