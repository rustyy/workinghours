import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';

import { HelperService } from '../shared/helper/helper.service';
import { DatabaseService } from '../shared/database/database.service';
import { map, switchMap } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecordListService {
  constructor(private helperService: HelperService, private db: DatabaseService) {}

  /**
   * Fetches records based on the given route-params.
   * Time range is calculated by year & week param.
   * If params are missing falls back to current week.
   */
  public recordsByRouteParams(params: Params) {
    return params.pipe(
      map(({ year, week }) => this.mapYearWeek({ year, week })),
      map(({ year, week }) => this.helperService.getMinMaxTime(year, week)),
      switchMap((o: any) => this.getRecords(o))
    );
  }

  public mapYearWeek({ year, week }: { year: string | number; week: string | number }): { year: number; week: number } {
    const now = moment();
    const yearDefault = now.format('YYYY');
    const weekDefault = now.isoWeek();

    return {
      year: +(year || yearDefault),
      week: +(week || weekDefault)
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
      to: maxTime
    };
  }

  private getRecords({ minTime, maxTime }: { minTime: number; maxTime: number }): Observable<TimeRecord[]> {
    return forkJoin({
      records: this.db.getRecordsInTimeRange(minTime, maxTime),
      types: this.db.getTypes()
    }).pipe(map(this.recordTypeMapper));
  }

  private recordTypeMapper({ records, types }: { records: TimeRecord[]; types: TimeRecordType[] }) {
    return records.map((record: TimeRecord) => {
      record.typeName = types[record.type].name;
      return record;
    });
  }
}
