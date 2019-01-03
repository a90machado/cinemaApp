import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Movie } from '../../models';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from '../../services';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-details-poster',
  templateUrl: './details-poster.component.html',
  styleUrls: ['./details-poster.component.css']
})
export class DetailsPosterComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  
  selectedMovie: Movie;
  formatDate: string;  

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

    if (this.dataService.getMovieByID(this.selectedId)) {
      this.selectedMovie = this.dataService.getMovieByID(this.selectedId);
    } else {
      this.router.navigate(['/notfound']);
    }
     this.formatDate=this.releaseDateMovie(this.selectedMovie);
  }

  selectedId: number;

  ngOnInit() { }

  buyClick() {
    this.style = 'block';
    this.stepper.selectedIndex = 1;
  }

  releaseDateMovie(selectedMovie){    
    return this.datepipe.transform(this.selectedMovie.releaseDate, 'yyyy-MM-dd');  
  }
  
}
