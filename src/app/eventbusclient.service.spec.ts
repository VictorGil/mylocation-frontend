import { TestBed, inject } from '@angular/core/testing';

import { EventbusclientService } from './eventbusclient.service';

describe('EventbusclientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventbusclientService]
    });
  });

  it('should be created', inject([EventbusclientService], (service: EventbusclientService) => {
    expect(service).toBeTruthy();
  }));
});
