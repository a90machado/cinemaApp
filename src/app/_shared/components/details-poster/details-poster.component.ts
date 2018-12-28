import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper} from '@angular/material';
import { getContext } from '@angular/core/src/render3/context_discovery';

@Component({
  selector: 'app-details-poster',
  templateUrl: './details-poster.component.html',
  styleUrls: ['./details-poster.component.css']
})
export class DetailsPosterComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  showSteps = false;
  style = 'none';

  constructor( ) { }

  ngOnInit() {
    
  }

  buyClick(){    
      this.showSteps = true;
      this.style = 'block';
      this.stepper.selectedIndex = 1;    
  }  

}
