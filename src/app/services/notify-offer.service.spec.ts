import { TestBed } from '@angular/core/testing';

import { NotifyOfferService } from './notify-offer.service';

describe('NotifyOfferService', () => {
  let service: NotifyOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifyOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
