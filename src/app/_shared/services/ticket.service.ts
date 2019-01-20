import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  public postTicket(ticket){   

    return this.httpClient.post('http://localhost:8080/CinemaTicketSystem/api/ticket/new',ticket).subscribe( () => {
      // on sucess without return
      }, err => {
      // on error
        console.log(err);
      }
    )
  }
    
}
