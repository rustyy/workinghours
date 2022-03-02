import moment from 'moment';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ITimeRecordType } from '../../types/ITimeRecordType';
import { DatabaseService } from '../shared/database/database.service';
import { HelperService, WeekNavigation, WeekYear } from '../shared/helper/helper.service';
import { SettingsService } from '../settings/settings.service';
import { ITimeRecord } from '../shared/database/TimesheetDatabase';

export interface Summary {
  current: number;
  max?: number;
  progress?: number;
}

export interface TimeRange extends WeekYear {
  prev: WeekNavigation;
  next: WeekNavigation;
  from: number;
  to: number;
}

@Injectable({
  providedIn: 'root',
})
export class RecordListService {
  constructor(private helperService: HelperService, private db: DatabaseService, private settings: SettingsService) {}

  /**
   * Fetches records based on the given route-params.
   * Time range is calculated by year & week param.
   * If params are missing falls back to current week.
   */
  public recordsByRouteParams(params: Params) {
    return params['pipe'](
      map(({ year, week }: { year: string; week: string }) => this.mapYearWeek({ year, week })),
      map(({ year, week }: { year: number; week: number }) => this.helperService.getMinMaxTime(year, week)),
      switchMap((o: any) => this.getRecords(o))
    );
  }

  /**
   * @todo: year/week to be required.
   */
  public mapYearWeek({ year, week }: { year?: string | number; week?: string | number }): WeekYear {
    const now = moment();
    const w = now.isoWeek();
    const month = now.month();
    let y = +now.format('YYYY');
    y = month === 11 && w === 1 ? y + 1 : y;

    if (month === 0 && w > 50) {
      y = y - 1;
    }

    return {
      year: +(year || y),
      week: +(week || w),
    };
  }

  public currentTimeRange({ year, week }: { year: number; week: number }) {
    const { minTime, maxTime } = this.helperService.getMinMaxTime(year, week);

    return {
      year,
      week,
      prev: this.helperService.getPrevWeek(year, week),
      next: this.helperService.getNextWeek(year, week),
      from: minTime,
      to: maxTime,
    };
  }

  public sumHours(records: Observable<ITimeRecord[]>) {
    return records.pipe(
      map((recs) => recs.map((r) => r.overall)),
      map((recs) => {
        const hours = recs.reduce((acc, curr) => acc + curr, 0) / 60;
        // 2 decimal place.
        return Math.round(hours * 100) / 100;
      })
    );
  }

  public summary(records: Observable<ITimeRecord[]>): Observable<Summary> {
    const weeklyHours = +(this.settings.get('weeklyHours') || 0);
    return this.sumHours(records).pipe(
      map((sum) => {
        const result: Summary = { current: sum };

        if (weeklyHours) {
          result.max = weeklyHours;
          result.progress = Math.ceil((sum / weeklyHours) * 100);
        }

        return result;
      })
    );
  }

  private getRecords({ minTime, maxTime }: { minTime: number; maxTime: number }): Observable<ITimeRecord[]> {
    return forkJoin({
      records: this.db.getRecordsInTimeRange(minTime, maxTime),
      types: this.db.getTypes(),
    }).pipe(map(this.recordTypeMapper));
  }

  private recordTypeMapper({ records, types }: { records: ITimeRecord[]; types: ITimeRecordType[] }) {
    return records.map((record: ITimeRecord) => {
      record['typeName'] = types[record.type].name;
      return record;
    });
  }
}
