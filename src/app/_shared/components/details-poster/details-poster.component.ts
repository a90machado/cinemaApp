import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Movie } from '../../models';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DataService } from '../../services';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-details-poster',
  templateUrl: './details-poster.component.html',
  styleUrls: ['./details-poster.component.css']
})
export class DetailsPosterComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  @Input() movie: Movie;
  selectedMovie: Movie;

  style = 'none';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  selectedId: number;

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.selectedId = +params.get('id');
      }
    );

    if (this.dataService.getMovieByID(this.selectedId)  ){
      this.selectedMovie = this.dataService.getMovieByID(this.selectedId); 
    } else {
      this.router.navigate(['/notfound']);
    }  
  }

  buyClick() {
    this.style = 'block';
    this.stepper.selectedIndex = 1;
  }
}
