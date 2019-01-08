import { TestBed } from '@angular/core/testing';

import { TypeOfTicketService } from './type-of-ticket.service';

describe('TypeOfTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeOfTicketService = TestBed.get(TypeOfTicketService);
    expect(service).toBeTruthy();
  });
});
