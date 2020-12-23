import { TestBed } from '@angular/core/testing';
import { UniqueEntryValidator } from './UniqueEntryValidator';
import { DatabaseService } from '../database/database.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import * as moment from 'moment';

const fb = new FormBuilder();

const createMockGroup = (start = '', end = '', date = '', id = '') => {
  return fb.group({
    date: [date],
    start: [start],
    end: [end],
    id: [id],
  });
};

describe('UniqueEntryValidator', () => {
  let uniqueEntryValidator: UniqueEntryValidator;
  let dbServiceSpy: jasmine.SpyObj<DatabaseService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DatabaseService', ['getRecordsInTimeRange']);

    TestBed.configureTestingModule({
      providers: [UniqueEntryValidator, { provide: DatabaseService, useValue: spy }],
    });

    uniqueEntryValidator = TestBed.inject(UniqueEntryValidator);
    dbServiceSpy = TestBed.inject(DatabaseService) as jasmine.SpyObj<DatabaseService>;
  });

  it('should create', () => {
    expect(uniqueEntryValidator).toBeTruthy();
  });

  describe('#validate', () => {
    it('should databaseService.getRecordsInTimeRange once passing two timestamp args', (done) => {
      const group = createMockGroup('10:00', '12:00', '2020-01-17', '2');
      const getRecordsInTimeRangeCalls = dbServiceSpy.getRecordsInTimeRange.calls;

      dbServiceSpy.getRecordsInTimeRange.and.returnValue(of([]));

      uniqueEntryValidator.validate(group).subscribe(() => {
        expect(getRecordsInTimeRangeCalls.count()).toBe(1);

        const arg1 = moment('2020-01-17', 'YYYY-MM-DD').valueOf();
        expect(getRecordsInTimeRangeCalls.first().args[0]).toBe(arg1);

        const arg2 = moment('2020-01-17 23:59:59.999', 'YYYY-MM-DD HH:mm:ss.SSS').valueOf();
        expect(getRecordsInTimeRangeCalls.first().args[1]).toBe(arg2);

        done();
      });
    });

    it('should ignore record being edited', (done) => {
      const group = createMockGroup('10:00', '12:00', '2020-01-17', '2');
      dbServiceSpy.getRecordsInTimeRange.and.returnValue(
        of([
          {
            id: 2,
            start: 1,
            end: 2,
            type: 0,
            overall: 1,
          },
        ])
      );

      uniqueEntryValidator.validate(group).subscribe((validationResult) => {
        expect(validationResult).toBeNull();
        done();
      });
    });

    it('should return an error for duplicated entries', (done) => {
      const groupMock = createMockGroup('10:00', '12:00', '2020-01-17', '2');
      const collectionMock = [
        // Conflicting
        {
          id: 1,
          start: moment('2020-01-17 09:00', 'YYYY-MM-DD HH:mm').valueOf(),
          end: moment('2020-01-17 13:00', 'YYYY-MM-DD HH:mm').valueOf(),
          type: 0,
          overall: 1,
        },
        // To be ignored anyway.
        {
          id: 2,
          start: 1,
          end: 2,
          type: 0,
          overall: 1,
        },
        // Conflicting
        {
          id: 3,
          start: moment('2020-01-17 07:00', 'YYYY-MM-DD HH:mm').valueOf(),
          end: moment('2020-01-17 13:00', 'YYYY-MM-DD HH:mm').valueOf(),
          type: 0,
          overall: 1,
        },
      ];
      const conflictingRecords = [collectionMock[0], collectionMock[2]];

      dbServiceSpy.getRecordsInTimeRange.and.returnValue(of(collectionMock));

      uniqueEntryValidator.validate(groupMock).subscribe((validationResult) => {
        expect(validationResult).toEqual({ conflictingRecord: conflictingRecords });
        done();
      });
    });
  });
});
