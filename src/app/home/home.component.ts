import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from '../_shared';
import { DataService } from '../_shared/services';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  
})
export class HomeComponent implements OnInit {

  noPause = false;
  movies$: ReplaySubject<Movie[]>;
  @Output() selectedMovie: EventEmitter<any> = new EventEmitter<any>();

  constructor(  private _dataService: DataService,
                private _router: Router ) {
    this.movies$ = this._dataService.movies$;
   }

  ngOnInit() {   
  }  

  openDetails(movie){
    this._router.navigate(['detailsposter', movie.id]);
    // this.selectedMovie.emit(movie);
  }

}
