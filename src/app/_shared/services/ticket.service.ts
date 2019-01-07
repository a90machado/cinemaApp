import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  public getTickets(){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/ticket');
  }
}
