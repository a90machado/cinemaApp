import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../_shared/services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  
})
export class HomeComponent implements OnInit {

  noPause = false;
  movies: any;
  cinemas: any;
  cinemaMovies: any;

  containerAll='block';
  containerCinema='none';

  constructor(  private _dataService: DataService,
                private _router: Router ) {

          

    this.movies = this._dataService.movies$;

    this._dataService.allCinemas();
    this.cinemas=this._dataService.allCinemas$;
    
   }

  ngOnInit() { 
    
  }  

  clickedCinema(cinemaId){
    this._dataService.cinemaMovies(cinemaId);
    this.cinemaMovies=this._dataService.cinemaMovies$;
    this.containerAll='none';
    this.containerCinema='block';
  }

  clickedAll(){
    this.containerAll='block';
    this.containerCinema='none';
  }

  openDetails(movie){       
    this._router.navigate(['detailsposter',movie.id]);       
  }


}
