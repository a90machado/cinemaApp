import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPosterComponent } from './details-poster.component';

describe('DetailsPosterComponent', () => {
  let component: DetailsPosterComponent;
  let fixture: ComponentFixture<DetailsPosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
