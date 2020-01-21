import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class HelperService {
  constructor() {}

  static parseYearWeek(y, w, direction) {
    const m = {
      prev: 'subtract',
      next: 'add'
    };

    const mom = moment(`${y} ${w} 1`, 'YYYY W E')[m[direction]](1, 'w');
    const week = +mom.format('W');
    const weeksInYear = mom.isoWeeksInYear();

    return { week, weeksInYear };
  }

  // @todo typing return value
  // @todo: can be static
  getMinMaxTime(year, week) {
    const format = 'YYYY W E HH:mm:ss.SSS';
    const start = `${year} ${week} 1 00:00:00.000`;
    const end = `${year} ${week} 7 23:59:59.999`;

    return {
      minTime: moment(start, format).valueOf(),
      maxTime: moment(end, format).valueOf()
    };
  }

  hhMmToMinutes(val: string, delimiter: string = ':'): number {
    const [hours, minutes] = val.split(delimiter);
    return +hours * 60 + +minutes;
  }

  minutesToHhMm(val: number, delimiter: string = ':'): string {
    const hours = Math.floor(val / 60);
    const hoursString = hours === 0 ? '00' : hours < 10 ? `0${hours}` : hours;
    const minutes = val % 60;
    const minutesString = minutes === 0 ? '00' : minutes < 10 ? `0${minutes}` : minutes;

    return `${hoursString}${delimiter}${minutesString}`;
  }

  toHHmm(data): string {
    return moment(data).format('HH:mm');
  }

  getNextWeek(curYear: number, curWeek: number): { year: number; week: number; path: string } {
    const { week, weeksInYear } = HelperService.parseYearWeek(curYear, curWeek, 'next');
    const year = curWeek === weeksInYear ? curYear + 1 : curYear;
    const path = `/${year}/${week}`;

    return { year, week, path };
  }

  getPrevWeek(curYear: number, curWeek: number): { year: number; week: number; path: string } {
    const { week } = HelperService.parseYearWeek(curYear, curWeek, 'prev');
    const year = curWeek === 1 ? curYear - 1 : curYear;
    const path = `/${year}/${week}`;

    return { year, week, path };
  }
}
