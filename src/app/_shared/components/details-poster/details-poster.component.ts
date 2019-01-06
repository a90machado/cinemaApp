import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Movie } from '../../models';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from '../../services';
import { DatePipe } from '@angular/common';
import { Schedule } from '../../models/schedule';
import { Cinema } from '../../models/cinema';



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
  selectedSchedules: string[]; 
  cinemas: any; 

  hoursBegin:Number;
  minutesBegin:Number;
  hoursEnd:Number;
  minutesEnd:Number;

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
     
    //GET SCHEDULES 
    this.dataService.getSchedule(this.selectedId);
    this.schedules=this.dataService.schedules$;     
    console.log(this.schedules);
   //GET CINEMAS 
   this.dataService.getCinemas(); 
   this.cinemas=this.dataService.cinemas$

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
    
    if(session%60==0){
      return ((session-session%60)/60)+':00';
    }else if(session%10!=0 && session%60<10){
      return (((session-session%60)/60)+':0'+(session%60));
    }else{
    return (((session-session%60)/60)+':'+(session%60));
    }
  }
      
}
