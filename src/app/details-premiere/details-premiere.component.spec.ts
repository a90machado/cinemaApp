import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPremiereComponent } from './details-premiere.component';

describe('DetailsPremiereComponent', () => {
  let component: DetailsPremiereComponent;
  let fixture: ComponentFixture<DetailsPremiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPremiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPremiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
