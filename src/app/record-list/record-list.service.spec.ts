import { TestBed } from '@angular/core/testing';

import { RecordListService } from './record-list.service';

describe('RecordListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordListService = TestBed.get(RecordListService);
    expect(service).toBeTruthy();
  });
});
