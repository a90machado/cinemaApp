import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExibitionDayService {

  constructor(private httpClient: HttpClient) { } 
 
  public getExibitionDayfromRoom(id){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/exibitionday/room/'+id)
  }
}
