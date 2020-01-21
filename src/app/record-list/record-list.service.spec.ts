import { TestBed } from '@angular/core/testing';

import { RecordListService } from './record-list.service';

describe('RecordListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: RecordListService = TestBed.get(RecordListService);
    expect(service).toBeTruthy();
  });
});
