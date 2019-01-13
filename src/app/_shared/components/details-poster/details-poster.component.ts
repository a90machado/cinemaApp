import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatStepper } from '@angular/material';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
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
  formatDate: string;
  selectedId: number;
  schedules: any;
  exibitionDays: any; 
  cinemas: any;
  rooms:any;
  typeOfTickets: any;
  header: any[];
  
  currentDate: number;
  currentDay: string;
  currentMonth: string;
  currentYear: string;
  cinemaId: number;

  style = 'none';

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
      this.router.navigate(['/notfound']);
    }
     this.formatDate=this.releaseDateMovie(this.selectedMovie);
     
   //GET CINEMAS 
   this.dataService.getCinemas(this.selectedId); 
   this.cinemas=this.dataService.cinemas$;

   //GET EXIBITION DAYS
   this.dataService.getExibitionDayfromRoom(this.selectedId);
   this.exibitionDays=this.dataService.exibitionDays$;

   //GET SCHEDULES 
   this.dataService.getSchedule(this.selectedId);   
   this.schedules=this.dataService.schedules$;     

   //GET TYPE OF TICKETS
   this.dataService.getTypeOfTickets();
   this.typeOfTickets=this.dataService.typeOfTickets$;
   this.header=['Type of Ticket', 'Price ($)', 'Amount'];
  }

  ngOnInit() { }

  buyClick() {
    this.style = 'block';
    this.stepper.selectedIndex = 1;
  }

  releaseDateMovie(selectedMovie){    
    return this.datepipe.transform(this.selectedMovie.releaseDate, 'yyyy-MM-dd');  
  } 

  dataForSelect(session){
    
    if(session/60>1 && session%60==0){
      return ((session-session%60)/60)+':00';
    }else if(session/60>1 && session%10!=0 && session%60<10){
      return(((session-session%60)/60)+':0'+(session%60));
    }else if(session/60==0 && session%10==0  && session%60<10){
      return '0'+(((session-session%60)/60)+':0'+(session%60));
    }else if(session/60<1 && session%10!=0  && session%60<10){
      return '0'+(((session-session%60)/60)+':0'+(session%60));
    } else if(session/60<1 && session%10!=0  && session%60>10){
      return '0'+(((session-session%60)/60)+":"+(session%60));
    }else if(session/60<1 && session%10==0){
      return '0'+(((session-session%60)/60)+":"+(session%60))+'0';
    }else{
    return (((session-session%60)/60)+':'+(session%60));
    }
  }

  clickedCinema(cinemaId){
    this.cinemaId = cinemaId;
    //GET ROOMS
   this.dataService.getRooms(this.selectedId,this.cinemaId);
   this.rooms=this.dataService.rooms$;
  }

  clickSession(){
    
  }

}
