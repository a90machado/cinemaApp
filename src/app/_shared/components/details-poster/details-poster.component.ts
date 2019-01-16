import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services';
import { DatePipe } from '@angular/common';
import { Movie } from '../..';


@Component({
  selector: 'app-details-poster',
  templateUrl: './details-poster.component.html',
  styleUrls: ['./details-poster.component.css']
})
export class DetailsPosterComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  selectedMovie: Movie;
  selectedId: number;
  formatDate: string;
  schedules: any;
  exibitionDays: any;
  cinemas: any;
  rooms: any;
  typeOfTickets: any;
  structure: any;
  header: any[];
  availableSeats: any;
  quantities: number[];
  tickets= {}; 
  seatsToChoose:number;
  clicked=false;

  cinemaId: number;
  scheduleId: number;
  roomId:number;
  
  soma=0;
  
  style = 'none';
  block = '';
  alertQtd = 'none';
  nextBtn = 'none';
  seatsBtn = 'none';

  rommDisplay = false;
  editable = false;
  clickDisplay = false;
  takeASeat = false;

  selectedQuantity = '';
  selectedRoom = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    public datepipe: DatePipe,


  ) {
    this.route.paramMap.subscribe(
      params => {
        this.selectedId = +params.get('id');
        
      }
    );

    //GET PATH AND DISPLAY WITH MOVIE ID
    
      if (this.dataService.getMovieByID(this.selectedId)) {
        this.selectedMovie = this.dataService.getMovieByID(this.selectedId);
      } else {
        this.router.navigate(['/home'])
      }

    this.formatDate=this.releaseDateMovie(this.selectedMovie);

    //GET CINEMAS 
    this.dataService.getCinemas(this.selectedId);
    this.cinemas = this.dataService.cinemas$;

    //GET EXIBITION DAYS
    this.dataService.getExibitionDayfromRoom(this.selectedId);
    this.exibitionDays = this.dataService.exibitionDays$;

    //GET SCHEDULES 
    this.dataService.getSchedule(this.selectedId);
    this.schedules = this.dataService.schedules$;

  }

  ngOnInit() {

  }

  releaseDateMovie(selectedMovie){    
    return this.datepipe.transform(this.selectedMovie.releaseDate, 'yyyy-MM-dd');  
  } 

  buyClick() {
    this.style = 'block';
    this.stepper.selectedIndex = 1;
    this.block = 'none';
  }

  dataForSelect(session) {

    if (session / 60 > 1 && session % 60 == 0) {
      return ((session - session % 60) / 60) + ':00';
    } else if (session / 60 > 1 && session % 10 != 0 && session % 60 < 10) {
      return (((session - session % 60) / 60) + ':0' + (session % 60));
    } else if (session / 60 == 0 && session % 10 == 0 && session % 60 < 10) {
      return '0' + (((session - session % 60) / 60) + ':0' + (session % 60));
    } else if (session / 60 < 1 && session % 10 != 0 && session % 60 < 10) {
      return '0' + (((session - session % 60) / 60) + ':0' + (session % 60));
    } else if (session / 60 < 1 && session % 10 != 0 && session % 60 > 10) {
      return '0' + (((session - session % 60) / 60) + ":" + (session % 60));
    } else if (session / 60 < 1 && session % 10 == 0) {
      return '0' + (((session - session % 60) / 60) + ":" + (session % 60)) + '0';
    } else {
      return (((session - session % 60) / 60) + ':' + (session % 60));
    }
  }

  clickedCinema(cinemaId) {
    this.cinemaId = cinemaId;

    //GET ROOMS
    this.dataService.getRooms(this.selectedId, this.cinemaId);
    this.rooms=this.dataService.rooms$;

    //GET TYPE OF TICKETS
    this.dataService.getTypeOfTickets(this.cinemaId);
    this.typeOfTickets = this.dataService.typeOfTickets$;
    this.header = ['Type of Ticket', 'Price', 'Amount'];

    this.stepper.selectedIndex = 2;
  }

  clickSession(scheduleId) {
    this.scheduleId = scheduleId;
    this.stepper.selectedIndex = 3;

    //GET AVAILABLE SEATS
    this.dataService.getAvailableSeats(this.cinemaId,this.selectedId,this.scheduleId);
    this.availableSeats = this.dataService.availableSeats$;

    this.availableSeats.subscribe((res: any) => {
      this.availableSeats = res;
    });

    this.quantities = [1, 2, 3, 4, 5, 6, 7, 8];
  }

  clickQuantity(quantity, ticketTypeId) {

    this.selectedQuantity=quantity;

    this.tickets[ticketTypeId]=+quantity;

    var keys=Object.keys(this.tickets);
    
    this.nextBtn = 'block';

    this.soma=0;
    for(var key of keys ){      
      this.soma+=this.tickets[key];

      if(this.soma>this.availableSeats){
        this.soma=this.soma-this.tickets[key];
        this.tickets[key]==0
        this.alertQtd='block';        
      }
    }    
  }

  clickNext() {
    this.stepper.selectedIndex = 4;
    this.seatsToChoose=this.soma;     
  }

  clickRoom(roomId){    
    //GET STRUCTURE
    this.dataService.getStructure(this.cinemaId,this.selectedId,this.scheduleId);
    this.structure=this.dataService.structure$

    this.selectedRoom='Room '+roomId;

    this.roomId=roomId;   
  }

  reserveSeat(i,j){ 
    this.rommDisplay=true;
    this.seatsToChoose--;

    if(this.seatsToChoose==0){
      this.clickDisplay=true;
      this.seatsBtn='block';
    }

    // if (this.clicked==true) {this.clicked=false} else {this.clicked = true}

  }

  unreserveSeat(){
    this.takeASeat=false;  
  }

  clickforLast(){
    this.stepper.selectedIndex = 5;
  }

}
