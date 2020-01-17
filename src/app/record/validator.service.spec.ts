import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DatabaseService } from '../shared/database/database.service';
import { ValidatorService } from './validator.service';

describe('ValidatorService', () => {
  let validatorService: ValidatorService;
  let dbServiceSpy: jasmine.SpyObj<DatabaseService>;
  let fb: FormBuilder;

  const createMockGroup = (start = '', end = '', date = '', id = '') => {
    return fb.group({
      date: [date],
      start: [start],
      end: [end],
      id: [id]
    });
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DatabaseService', ['getRecordsInTimeRange']);

    TestBed.configureTestingModule({
      providers: [ValidatorService, { provide: DatabaseService, useValue: spy }]
    });

    validatorService = TestBed.get(ValidatorService);
    dbServiceSpy = TestBed.get(DatabaseService);

    fb = new FormBuilder();
  });

  it('should be created', () => {
    expect(validatorService).toBeTruthy();
  });

  describe('#validateStartEnd', () => {
    it('should return null if start or end value is empty', () => {
      const validatorFn = validatorService.validateStartEnd();
      let group = createMockGroup();
      expect(validatorFn(group)).toBeNull();

      group = createMockGroup('01:00');
      expect(validatorFn(group)).toBeNull();

      group = createMockGroup('', '01:00');
      expect(validatorFn(group)).toBeNull();
    });

    it('should return error-object for start >= end', () => {
      const validatorFn = validatorService.validateStartEnd();
      const group = createMockGroup('01:00', '01:00');

      expect(validatorFn(group)).toEqual({ startEndMismatch: true });
    });

    it('should return null for start < end', () => {
      const validatorFn = validatorService.validateStartEnd();
      const group = createMockGroup('01:00', '01:01');

      expect(validatorFn(group)).toBeNull();
    });
  });

  describe('#validateUniqueEntry', () => {
    it('should databaseService.getRecordsInTimeRange once passing two timestamp args', done => {
      const validatorFn = validatorService.validateUniqueEntry();
      const group = createMockGroup('10:00', '12:00', '2020-01-17', '2');
      dbServiceSpy.getRecordsInTimeRange.and.returnValue(of([]));
      const getRecordsInTimeRangeCalls = dbServiceSpy.getRecordsInTimeRange.calls;

      validatorFn(group).subscribe(() => {
        expect(getRecordsInTimeRangeCalls.count()).toBe(1);
        expect(getRecordsInTimeRangeCalls.first().args[0]).toBe(1579215600000);
        expect(getRecordsInTimeRangeCalls.first().args[1]).toBe(1579301999999);
        done();
      });
    });

    it('should ignore record being edited', done => {
      const validatorFn = validatorService.validateUniqueEntry();
      const group = createMockGroup('10:00', '12:00', '2020-01-17', '2');
      dbServiceSpy.getRecordsInTimeRange.and.returnValue(
        of([
          {
            id: 2,
            start: 1,
            end: 2,
            type: 0,
            overall: 1
          }
        ])
      );

      validatorFn(group).subscribe(validationResult => {
        expect(validationResult).toBeNull();
        done();
      });
    });

    it('should return an error for duplicated entries', done => {
      const validatorFn = validatorService.validateUniqueEntry();
      const groupMock = createMockGroup('10:00', '12:00', '2020-01-17', '2');
      const collectionMock = [
        // Conflicting
        {
          id: 1,
          start: 1579251600000,
          end: 1579258800000,
          type: 0,
          overall: 1
        },
        // To be ignored anyway.
        {
          id: 2,
          start: 1,
          end: 2,
          type: 0,
          overall: 1
        },
        // Conflicting
        {
          id: 3,
          start: 1579251600000,
          end: 1579258800000,
          type: 0,
          overall: 1
        }
      ];
      const conflictingRecords = [collectionMock[0], collectionMock[2]];
      dbServiceSpy.getRecordsInTimeRange.and.returnValue(of(collectionMock));

      validatorFn(groupMock).subscribe(validationResult => {
        expect(validationResult).toEqual({ conflictingRecord: conflictingRecords });
        done();
      });
    });
  });
});
