import { TestBed } from '@angular/core/testing';

import { SendService } from './send.service';

describe('SendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: SendService = TestBed.get(SendService);
    expect(service).toBeTruthy();
  });
});
