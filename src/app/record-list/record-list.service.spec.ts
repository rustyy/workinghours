import { TestBed } from '@angular/core/testing';

import { HelperService } from '../shared/helper/helper.service';
import { DatabaseService } from '../shared/database/database.service';
import { SettingsService } from '../settings/settings.service';

import * as moment from 'moment';

import { RecordListService } from './record-list.service';

describe('RecordListService', () => {
  let service: RecordListService;
  let helperServiceSpy: jasmine.SpyObj<HelperService>;
  let databaseServiceSpy: jasmine.SpyObj<DatabaseService>;
  let settingsServiceSpy: jasmine.SpyObj<SettingsService>;

  beforeEach(() => {
    const spyHelper = jasmine.createSpyObj('HelperService', ['getMinMaxTime', 'getPrevWeek', 'getNextWeek']);
    const spyDb = jasmine.createSpyObj('DatabaseService', ['getRecordsInTimeRange', 'getTypes']);
    const spySettings = jasmine.createSpyObj('SettingsService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        RecordListService,
        { provide: HelperService, useValue: spyHelper },
        { provide: SettingsService, useValue: spySettings },
        { provide: DatabaseService, useValue: spyDb }
      ]
    });

    service = TestBed.get(RecordListService);
    helperServiceSpy = TestBed.get(HelperService);
    databaseServiceSpy = TestBed.get(DatabaseService);
    settingsServiceSpy = TestBed.get(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  describe('#mapYearWeek', () => {
    it('should calculate week and year at the turn of the year', () => {
      let now = moment('2020-01-01', 'YYYY-MM-DD').toDate();
      jasmine.clock().mockDate(now);
      let actual = service.mapYearWeek({});
      expect(actual).toEqual({ year: 2020, week: 1 });
      jasmine.clock().uninstall();

      now = moment('2019-12-31', 'YYYY-MM-DD').toDate();
      jasmine.clock().mockDate(now);
      actual = service.mapYearWeek({});
      expect(actual).toEqual({ year: 2020, week: 1 });
      jasmine.clock().uninstall();

      now = moment('2020-12-31', 'YYYY-MM-DD').toDate();
      jasmine.clock().mockDate(now);
      actual = service.mapYearWeek({});
      expect(actual).toEqual({ year: 2020, week: 53 });
      jasmine.clock().uninstall();
    });
  });

  describe('#currentTimeRange', () => {
    it('should call helperService.getMinMaxTime once', () => {
      helperServiceSpy.getMinMaxTime.and.returnValue({ minTime: 1, maxTime: 2 });
      service.currentTimeRange({ year: 2020, week: 1 });
      expect(helperServiceSpy.getMinMaxTime.calls.count()).toBe(1);
    });

    it('should call helperService.getPrevWeek once', () => {
      helperServiceSpy.getMinMaxTime.and.returnValue({ minTime: 1, maxTime: 2 });
      service.currentTimeRange({ year: 2020, week: 1 });
      expect(helperServiceSpy.getPrevWeek.calls.count()).toBe(1);
    });

    it('should call helperService.getNextWeek once', () => {
      helperServiceSpy.getMinMaxTime.and.returnValue({ minTime: 1, maxTime: 2 });
      service.currentTimeRange({ year: 2020, week: 1 });
      expect(helperServiceSpy.getNextWeek.calls.count()).toBe(1);
    });

    it('should pass through year/week arguments', () => {
      helperServiceSpy.getMinMaxTime.and.returnValue({ minTime: 1, maxTime: 2 });
      const actual = service.currentTimeRange({ year: 2020, week: 1 });
      expect(actual.year).toBe(2020);
      expect(actual.week).toBe(1);
    });
  });

  describe('#sumHours', () => {
    it('', () => {
      // @todo
    });
  });

  describe('#summary', () => {
    it('', () => {
      // @todo
    });
  });

  describe('#recordsByRouteParams', () => {
    it('', () => {
      // @todo
    });
  });
});
