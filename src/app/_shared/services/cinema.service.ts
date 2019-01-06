import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(private httpClient: HttpClient) { }

  public getCinemas(){
    return this.httpClient.get('http://localhost:8080/CinemaTicketSystem/api/cinema');
  }
}
