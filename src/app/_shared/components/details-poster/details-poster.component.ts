import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Movie } from '../../models';

@Component({
  selector: 'app-details-poster',
  templateUrl: './details-poster.component.html',
  styleUrls: ['./details-poster.component.css']
})
export class DetailsPosterComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  @Input() movie: Movie;

  style = 'none';

  constructor() { }

  ngOnInit() { 
    console.log(this.movie);
  }

  buyClick() {
    this.style = 'block';
    this.stepper.selectedIndex = 1;
  }
}
