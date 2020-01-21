import * as moment from 'moment-timezone';
import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    service = new HelperService();
    moment.tz.setDefault('Europe/Berlin');
  });

  afterEach(() => {
    moment.tz.setDefault();
  });

  describe('#getMinMaxTime', () => {
    it('should return an object with keys minTime, maxTime', () => {
      const [min, max] = Object.keys(service.getMinMaxTime(2019, 1));
      expect(min).toBe('minTime');
      expect(max).toBe('maxTime');
    });

    it('should return beginning timestamp and ending timestamp', () => {
      const expected = {
        minTime: 946854000000,
        maxTime: 947458799999
      };
      const actual = service.getMinMaxTime(2000, 1);
      expect(actual.minTime).toBe(expected.minTime, 'minTime incorrect');
      expect(actual.maxTime).toBe(expected.maxTime, 'maxTime incorrect');
    });
  });

  describe('#hhMmToMinutes', () => {
    it('should convert HH:mm string to minutes', () => {
      expect(service.hhMmToMinutes('01:30')).toBe(90);
      expect(service.hhMmToMinutes('01-30', '-')).toBe(90);
    });
  });

  describe('#minutesToHhMm', () => {
    it('should convert number to HH:mm by default', () => {
      expect(service.minutesToHhMm(5)).toBe('00:05');
      expect(service.minutesToHhMm(30)).toBe('00:30');
      expect(service.minutesToHhMm(90)).toBe('01:30');
      expect(service.minutesToHhMm(660)).toBe('11:00');
    });

    it('should convert number to HH[DELIMITER]mm using the given delimiter', () => {
      expect(service.minutesToHhMm(90, '-')).toBe('01-30');
    });
  });

  describe('#getPrevWeek', () => {
    it('should calculate 2020/1 before 2020/2', () => {
      const actual = service.getPrevWeek(2020, 2);
      const expected = {
        year: 2020,
        week: 1,
        path: '/2020/1'
      };

      expect(actual).toEqual(expected);
    });

    it('should calculate 2019/52 before 2020/1', () => {
      const actual = service.getPrevWeek(2020, 1);
      const expected = {
        year: 2019,
        week: 52,
        path: '/2019/52'
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('#getNextWeek', () => {
    it('should calculate 2020/2 follows 2020/1', () => {
      const actual = service.getNextWeek(2020, 1);

      const expected = {
        year: 2020,
        week: 2,
        path: '/2020/2'
      };

      expect(actual).toEqual(expected);
    });

    it('should 2020/1 follows 2019/52', () => {
      const actual = service.getNextWeek(2019, 52);

      const expected = {
        year: 2020,
        week: 1,
        path: '/2020/1'
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('#parseYearWeek', () => {
    it('should calculate correct weeks in year and next week', () => {
      const expected = { weeksInYear: 53, week: 2 };
      expect(HelperService.parseYearWeek(2020, 1, 'next')).toEqual(expected);
    });

    it('should calculate correct weeks in year and previous week', () => {
      const expected = { weeksInYear: 52, week: 52 };
      expect(HelperService.parseYearWeek(2020, 1, 'prev')).toEqual(expected);
    });
  });

  describe('#toHHmm', () => {
    it('should format date date to HH:mm', () => {
      const timestamp = moment('2020-01-01 02:30', 'YYYY-MM-DD HH:mm').valueOf();
      expect(service.toHHmm(timestamp)).toBe('02:30');
    });
  });
});
