import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';

import { HelperService } from '../shared/helper/helper.service';
import { DatabaseService } from '../shared/database/database.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordListService {
  constructor(private helperService: HelperService, private databaseService: DatabaseService) {}

  public getRecords({ year, week }: { year: number; week: number }): Observable<TimeRecord[]> {
    const { minTime, maxTime } = this.helperService.getMinMaxTime(year, week);
    const records$ = this.databaseService.getRecordsInTimeRange(minTime, maxTime);
    const types$ = this.databaseService.getTypes();

    const addTypeNameToRecords = (data: [TimeRecord[], TimeRecordType[]]) => {
      const [records, types] = data;

      return records.map((record: TimeRecord) => {
        record.typeName = types[record.type].name;
        return record;
      });
    };

    return forkJoin(records$, types$).pipe(map(addTypeNameToRecords));
  }

  public mapYearWeek({ year, week }: { year: string | number; week: string | number }): { year: number; week: number } {
    const now = moment();
    const yearDefault = now.format('YYYY');
    const weekDefault = now.isoWeek();

    year = year || yearDefault;
    week = week || weekDefault;

    return {
      year: +year,
      week: +week
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

  public getTypeNameById(id: number): Observable<TimeRecordType> {
    return this.databaseService.getType(id);
  }
}
