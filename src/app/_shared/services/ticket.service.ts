import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  public postTickets(ticket) {
    return this.httpClient.post('http://localhost:8080/CinemaTicketSystem/api/ticket/new/', ticket);
  }

}
