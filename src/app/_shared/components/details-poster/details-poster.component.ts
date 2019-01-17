import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services';
import { DatePipe } from '@angular/common';
import { Movie } from '../..';
import { Ticket } from '../../models/ticket';
import { Cinema } from '../../models/cinema';
import { Room } from '../../models/room';


@Component({
  selector: 'app-details-poster',
  templateUrl: './details-poster.component.html',
  styleUrls: ['./details-poster.component.css']
})
export class DetailsPosterComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;

  selectedMovie: Movie;
  selectedId: number;
  cinemaId: number;
  scheduleId: number;
  roomId: number;
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
  tickets = {};
  seatsToChoose: number;
  roomStruct: any;
  ObjRooms: any;
  roomPosition: number;
  add: number;
  tpOfTickets: any;
  roomsCinema: any;
  postTicket: Ticket;
  postRoomStructure: any = [];
  cinemaTicket: any;
  roomTicket: any;
  takeRoomPositions: number;

  style = 'none';
  block = '';
  alertQtd = 'none';
  nextBtn = 'none';
  seatsBtn = 'none';

  rommDisplay = false;
  editable = false;
  clickDisplay = false;

  selectedQuantity = '';
  selectedRoom = '';
  iconSelect = false;

  //__________________________________________________________________________________________

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

    this.formatDate = this.releaseDateMovie(this.selectedMovie);

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

    this.structure = this.dataService.structure$;

    this.structure.subscribe((a) => {
        
      this.roomStruct = a;

      for (let index = 0; index < this.roomStruct.length; index++) {
        this.roomStruct[index] = (this.roomStruct[index]) ? 'occupied' : 'free';
      }

    });    

    this.rooms = this.dataService.rooms$;

    // PROBLEMA
    this.rooms.subscribe((b) => {
      this.roomsCinema = b;
    }); 

    this.typeOfTickets = this.dataService.typeOfTickets$;

    this.typeOfTickets.subscribe((c) => {
      this.tpOfTickets = c;
    });

    this.availableSeats = this.dataService.availableSeats$;
    this.availableSeats.subscribe((res: any) => {
      this.availableSeats = res;
    });
  }

  //_______________________________________________________________________________________  

  releaseDateMovie(selectedMovie) {
    return this.datepipe.transform(selectedMovie.releaseDate, 'yyyy-MM-dd');
  }

  buyClick() {
    this.style = 'block';
    this.stepper.selectedIndex = 1;
    this.block = 'none';
  }

  resetClick() {
    // this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
    // this.router.navigate(["detailsposter/"+this.selectedId])); 
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

    //GET TYPE OF TICKETS
    this.dataService.getTypeOfTickets(this.cinemaId);

    this.header = ['Type of Ticket', 'Price', 'Amount'];

    this.stepper.selectedIndex = 2;
  }

  clickSession(scheduleId) {
    this.scheduleId = scheduleId;
    this.stepper.selectedIndex = 3;

    //GET AVAILABLE SEATS
    this.dataService.getAvailableSeats(this.cinemaId, this.selectedId, this.scheduleId);

    this.quantities = [1, 2, 3, 4, 5, 6, 7, 8];
  }

  clickQuantity(quantity, ticketTypeId) {

    this.selectedQuantity = quantity;

    this.tickets[ticketTypeId] = +quantity;

    var keys = Object.keys(this.tickets);

    this.nextBtn = 'block';

    this.add = 0;
    for (var key of keys) {
      this.add += this.tickets[key];

      if (this.add > this.availableSeats) {
        this.add = this.add - this.tickets[key];
        this.tickets[key] == 0
        this.alertQtd = 'block';
      }
    }
  }

  clickNext() {
    this.stepper.selectedIndex = 4;
    this.seatsToChoose = this.add;    
  }

  clickRoom(roomId) { 
    
    //GET STRUCTURE
    this.dataService.getStructure(this.cinemaId, this.selectedId, this.scheduleId);

    this.selectedRoom = 'Room ' + roomId;

    this.roomId = roomId;

    this.roomPosition = 0;
    
    for (var key of this.roomsCinema) {
             
      if (key.id == this.roomId) {
        
        return this.roomPosition;
      } else {        
        this.roomPosition += ((key.numberOfSeatsPerQueue * key.numberOfQueues));
      }

      if(key.id > this.roomId){
        this.takeRoomPositions += ((key.numberOfSeatsPerQueue * key.numberOfQueues));
      }
    } 

  }

  getStructure(i, j) {    
    if (this.roomStruct !== undefined) {
      let position = '' + i + j;
        
      return this.roomStruct[Number(this.roomPosition + position)];
    }
  }

  reserveSeat(i, j) {
    this.rommDisplay = true;

    if (this.add > 0) {
      this.add--;

      let position = '' + i + j;
      this.roomStruct[Number(this.roomPosition + position)] = 'reserved';
      if (this.add == 0) {
        this.seatsBtn = 'block';
      }
    }
  }

  unreserveSeat(i, j) {

    if (this.add >= 0) {
      this.add++;
      let position = '' + i + j;
      this.roomStruct[Number(this.roomPosition + position)] = 'free';
    }

    if (this.add == this.seatsToChoose) {
      this.rommDisplay = false;
    }
    if (this.add > 0) {
      this.seatsBtn = 'none';
    }
  }

  clickforLast() {
    this.stepper.selectedIndex = 5;
  }

  postInformation() {

    //POST SEATS INFORMATION

    for (let index = +this.roomPosition; index < this.roomStruct.length-this.takeRoomPositions; index++) {

      if (this.roomStruct[index] == "free") {
        this.postRoomStructure[index] = false;
      } else {
        this.postRoomStructure[index] = true;
      }

    }

    // this.dataService.postStructure(this.postRoomStructure).subscribe((res)=>{
    //   console.log(res);

    // },(err)=>{
    //   console.log(err);

    // });



    //POST TICKET

    var tickts = Object.keys(this.tickets);

    for (let i = 0; i < this.roomsCinema.length; i++) {
      if (this.roomsCinema[i].id == this.roomId)
        for (var key of tickts) {

          for (let index = 1; index <= this.tickets[key]; index++) {

            for (let j = 0; j < this.tpOfTickets.length; j++) {

              if (this.tpOfTickets[j].id == key) {

                this.postTicket = new Ticket();
                this.cinemaTicket = new Cinema();
                this.roomTicket = new Room();

                this.postTicket.room = this.roomsCinema[i];
                this.postTicket.typeOfTicket = this.tpOfTickets[j];

                //   this.dataService.postTickets(this.postTicket).subscribe((res)=>{
                //   console.log(res);

                // },(err)=>{
                //   console.log(err);

                // });

              }
            }
          }
        }
    }
  }
}
