import { TestBed, inject } from '@angular/core/testing';

import { EventBusClientService } from './eventBusClient.service';

describe('EventbusclientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventBusClientService]
    });
  });

  it('should be created', inject([EventBusClientService], (service: EventBusClientService) => {
    expect(service).toBeTruthy();
  }));
});
