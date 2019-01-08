import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeOfTicketService {

  constructor(private httpClient: HttpClient) { }

  public getTypeOfTickets(){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/typeofticket');
  }
}
