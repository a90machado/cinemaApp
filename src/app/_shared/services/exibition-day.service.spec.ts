import { TestBed } from '@angular/core/testing';

import { ExibitionDayService } from './exibition-day.service';

describe('ExibitionDayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExibitionDayService = TestBed.get(ExibitionDayService);
    expect(service).toBeTruthy();
  });
});
