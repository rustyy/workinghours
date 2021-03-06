import { Injectable } from '@angular/core';
import moment from 'moment';
import { prependLeadingZero } from '../utils/utils';

export interface WeekYear {
  week: number;
  year: number;
}

export interface WeekNavigation extends WeekYear {
  path: string;
}

@Injectable()
export class HelperService {
  static parseYearWeek(y: number, w: number, direction: 'prev' | 'next') {
    let mom = moment(`${y} ${w} 1`, 'YYYY W E');
    mom = direction === 'prev' ? mom.subtract(1, 'w') : mom.add(1, 'w');

    const week = +mom.format('W');
    const weeksInYear: number = mom.isoWeeksInYear();

    return { week, weeksInYear };
  }

  // @todo typing return value
  // @todo: can be static
  getMinMaxTime(year: number, week: number) {
    const format = 'YYYY W E HH:mm:ss.SSS';
    const start = `${year} ${week} 1 00:00:00.000`;
    const end = `${year} ${week} 7 23:59:59.999`;

    return {
      minTime: moment(start, format).valueOf(),
      maxTime: moment(end, format).valueOf(),
    };
  }

  hhMmToMinutes(val: string, delimiter: string = ':'): number {
    const [hours, minutes] = val.split(delimiter);
    return +hours * 60 + +minutes;
  }

  minutesToHhMm(val: number, delimiter: string = ':'): string {
    const hoursString = prependLeadingZero(Math.floor(val / 60));
    const minutesString = prependLeadingZero(val % 60);

    return `${hoursString}${delimiter}${minutesString}`;
  }

  toHHmm(data: number | string): string {
    return moment(data).format('HH:mm');
  }

  getNextWeek(curYear: number, curWeek: number): WeekNavigation {
    const mom = moment(`${curYear} ${curWeek} 1`, 'YYYY W E');
    const weeks = mom.isoWeeksInYear();
    const year = curWeek === weeks ? curYear + 1 : curYear;
    const week = +mom.add(1, 'w').format('W');
    const path = `/${year}/${week}`;

    return { year, week, path };
  }

  getPrevWeek(curYear: number, curWeek: number): WeekNavigation {
    const mom = moment(`${curYear} ${curWeek} 1`, 'YYYY W E');
    const week = +mom.subtract(1, 'w').format('W');
    const year = curWeek === 1 ? curYear - 1 : curYear;
    const path = `/${year}/${week}`;

    return { year, week, path };
  }
}
