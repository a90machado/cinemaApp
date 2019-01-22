import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services';
import { DatePipe } from '@angular/common';
import { Movie } from '../..';
import { Ticket } from '../../models/ticket';
import { Room } from '../../models/room';
import { TypeOfTicket } from '../../models/typeOfTicket';
import { Schedule } from '../../models/schedule';
import { TicketService } from '../../services/ticket.service';
import * as emailjs from 'emailjs-com';
import { ScheduleService } from '../../services/schedule.service';


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
  schedule: Schedule;
  seatsToChoose: number;
  roomStruct: any;
  ObjRooms: any;
  roomPosition: number;
  add: number;
  tpOfTickets: any;
  roomsCinema: any = [];
  postTicket: Ticket;
  typeTicket: TypeOfTicket;
  postRoomStructure: any = [];
  cinemaTicket: any;
  roomTicket: any;
  takeRoomPositions: number;
  count: number;
  postStructure: any = [];
  cinemaName: string;
  priceTicket= {};
  totalPrice = 0;
  totalQuantity = 0;
  totalPriceToString: string;
  totalQuantityToString: string;
  allSeats: any =[];

  style = 'none';
  block = '';
  alertQtd = 'none';
  nextBtn = 'none';
  seatsBtn = 'none';
  

  rommDisplay = false;
  editable = false;
  clickDisplay = false;
  iconSelect = false;

  selectedRoom = '';
  emailSeats = '';
  session = '';

  email = {
    name: '',
    cinema_name: '',
    movie_title: '',
    quantity: '',
    session: '',
    seats: '',
    price: '',
    to_email: ''
  };

  //__________________________________________________________________________________________

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    public datepipe: DatePipe,
    private ticketService: TicketService,
    private scheduleService: ScheduleService
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
      this.router.navigate(['/home']);
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

    this.rooms = this.dataService.rooms$;

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

    this.structure = this.dataService.structure$;

    this.structure.subscribe((a) => {

      this.roomStruct = a;

      for (let index = 0; index < this.roomStruct.length; index++) {
        this.roomStruct[index] = (this.roomStruct[index]) ? 'occupied' : 'free';
      }
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

  clickedCinema(cinemaName,cinemaId) {
    this.cinemaId = cinemaId;
    this.cinemaName = cinemaName;      

    //GET ROOMS
    this.dataService.getRooms(this.selectedId, this.cinemaId);

    //GET TYPE OF TICKETS
    this.dataService.getTypeOfTickets(this.cinemaId);

    this.header = ['Type of Ticket', 'Price', 'Amount'];

    this.stepper.selectedIndex = 2;
  }

  clickSession(scheduleId,dayOfWeek,day,sessionBegin) {

   this.session=''+dayOfWeek+', '+day+' - '+this.dataForSelect(sessionBegin);

    this.scheduleId = scheduleId;
    this.stepper.selectedIndex = 3;

    //GET AVAILABLE SEATS
    this.dataService.getAvailableSeats(this.cinemaId, this.selectedId, this.scheduleId);

    this.quantities = [1, 2, 3, 4, 5, 6, 7, 8];
  }

  clickQuantity(quantity, ticketTypeId, priceTicket) {

    this.priceTicket[ticketTypeId] = +priceTicket;

    this.tickets[ticketTypeId] = +quantity;

    var keys = Object.keys(this.tickets);

    this.add = 0;
    for (var key of keys) {
      this.add += this.tickets[key];

      if (this.add > this.availableSeats) {
        this.add = this.add - this.tickets[key];
        this.tickets[key] == 0
        this.alertQtd = 'block';
      }
    }
    if (this.add > 0) {
      this.nextBtn = 'block';
    } else {
      this.nextBtn = 'none';
    }
  }

  calculatePriceAndQuantity(){
    var keys = Object.keys(this.tickets);
    
    for(var key of keys){
      this.totalPrice += this.tickets[key]*this.priceTicket[key];
      this.totalQuantity += this.tickets[key];           
    }

    this.totalPriceToString=this.totalPrice+'$';
    this.totalQuantityToString=this.totalQuantity+'';
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
    this.takeRoomPositions = 0;

    if (this.roomsCinema !== undefined) {

      for (var key of this.roomsCinema) {
        if (key.id > this.roomId) {
          this.takeRoomPositions += ((key.numberOfSeatsPerQueue * key.numberOfQueues));
        }
      }

      for (var key of this.roomsCinema) {
        if (key.id == this.roomId) {
          return this.roomPosition;
        } else {
          this.roomPosition += ((key.numberOfSeatsPerQueue * key.numberOfQueues));
        }
      }

    }
  }

  getStructure(i, j) {
    if (this.roomStruct !== undefined) {
      let position = '' + i + j;

      return this.roomStruct[(this.roomPosition + Number(position))];
    }
  }

  reserveSeat(i, j) {
    this.rommDisplay = true;

    if (this.add > 0) {
      this.add--;

      let position = '' + i + j;
      this.roomStruct[(this.roomPosition + Number(position))] = 'reserved';
      this.allSeats[Number(position)]= 'queue ' + (i+1) + ' ' + 'seat ' + (Number(position)+1) + '; ';
      if (this.add == 0) {
        this.seatsBtn = 'block';
      }
    }
  }

  unreserveSeat(i, j) {

    if (this.add >= 0) {
      this.add++;
      let position = '' + i + j;
      this.roomStruct[(this.roomPosition + Number(position))] = 'free';
      this.allSeats[Number(position)]='';
    }

    if (this.add == this.seatsToChoose) {
      this.rommDisplay = false;
    }
    if (this.add > 0) {
      this.seatsBtn = 'none';
    }
  }

  clickforLast() {
    this.stepper.selectedIndex = 5
  }

  sendTicket() {

    emailjs.send('gmail', 'template_tga2n5Oz', this.email, 'user_i7ypDAjWJwNDhPVXUO4Zz')
      .then((res) => {
        window.location.reload();   
      }, (err) => {
        console.log('FAILED...', err);
      });
  }

  postInformation(name,email) {
    
    this.calculatePriceAndQuantity();

    var keys = Object.keys(this.allSeats);
    for(var key of keys){     
      if(this.allSeats[key]!=='undefined'){
        this.emailSeats += this.allSeats[key];
      }      
    }    

    this.email.cinema_name = this.cinemaName;
    this.email.movie_title = this.selectedMovie.title;
    this.email.name = name;
    this.email.price = this.totalPriceToString;
    this.email.quantity = this.totalQuantityToString;
    this.email.seats = this.emailSeats;
    this.email.session = this.session;
    this.email.to_email = email;  

    //POST SEATS INFORMATION     

    for (let index = +this.roomPosition; index < this.roomStruct.length - this.takeRoomPositions; index++) {

      if (this.roomStruct[index] == "free") {
        this.postRoomStructure[index] = false;
      } else {
        this.postRoomStructure[index] = true;
      }

    }

    var i=0;
    for (let index = +this.roomPosition; index < this.roomStruct.length - this.takeRoomPositions; index++) {
      this.postStructure[i]=this.postRoomStructure[index];
      i++;      
    }

    this.schedule = new Schedule();
    this.schedule.id = this.scheduleId;
    this.schedule.structure = this.postStructure;     
    
    this.scheduleService.postStructure(this.schedule, this.roomId, this.totalQuantity);

    //POST TICKET

    var tickts = Object.keys(this.tickets);

    for (let i = 0; i < this.roomsCinema.length; i++) {
      if (this.roomsCinema[i].id == this.roomId)
        for (var key of tickts) {

          for (let index = 1; index <= this.tickets[key]; index++) {

            for (let j = 0; j < this.tpOfTickets.length; j++) {

              if (this.tpOfTickets[j].id == key) {

                this.postTicket = new Ticket();
                this.typeTicket = new TypeOfTicket();
                this.roomTicket = new Room();

                this.typeTicket.id = j+1;
                this.typeTicket.priceOfTicket = this.tpOfTickets[j].priceOfTicket;
                this.typeTicket.typeOfTicket = this.tpOfTickets[j].typeOfTicket;

                this.postTicket.room = this.roomsCinema[i];
                this.postTicket.typeOfTicket = this.typeTicket;

               this.ticketService.postTicket(this.postTicket).subscribe( () => {
                // on sucess without return  
                }, err => {
                // on error
                  console.log(err);
                }
              );               

              }
            }
          }
        }
    }
    //SEND EMAIL
    //this.sendTicket();

  }

}
