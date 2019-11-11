import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { HelperService } from '../shared/helper/helper.service';
import { FormGroup } from '@angular/forms';
import { DatabaseService } from '../shared/database/database.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor(
    private databaseService: DatabaseService,
    private helper: HelperService,
    private translateService: TranslateService
  ) {}

  public getRecord(id: number): Observable<any> {
    return id ? this.databaseService.getRecord(id).pipe(map(x => this.recordToFormData(x))) : this.defaultRecord();
  }

  public addRecord(formData): Observable<number> {
    const record = this.formDataToRecord(formData);
    return this.databaseService.addRecord(record);
  }

  public deleteRecord(id: number): Observable<void> {
    return this.databaseService.deleteRecord(id);
  }

  public setControlValues(fg: FormGroup, record: TimeRecord): void {
    for (const prop in record) {
      if (record.hasOwnProperty(prop)) {
        fg.controls[prop].setValue(record[prop]);
      }
    }
  }

  public calculateOverall(fg: FormGroup): string {
    const start: string = fg.controls.start.value;
    const end: string = fg.controls.end.value;
    const breakVal: string = fg.controls.break.value;

    const s = this.helper.hhMmToMinutes(start);
    const e = this.helper.hhMmToMinutes(end);
    const b = this.helper.hhMmToMinutes(breakVal);
    const overall = e - s - b;
    return overall >= 0 ? this.helper.minutesToHhMm(overall) : '';
  }

  public getTypes(): Observable<any[]> {
    const types$ = this.databaseService.getTypes();
    const typesTranslations$ = this.translateService.get('TYPES');

    const mapTranslations = (data: [TimeRecordType[], string[]]): TimeRecordType[] => {
      const [types, translations] = data;

      return types.map((type: TimeRecordType) => {
        type.name = translations[`type${type.id}`];
        return type;
      });
    };

    return forkJoin(types$, typesTranslations$).pipe(map(mapTranslations));
  }

  private defaultRecord(): Observable<TimeRecord> {
    return of(this.recordToFormData(this.emptyRecord()));
  }

  private emptyRecord() {
    const record: TimeRecord = {} as TimeRecord;
    const start = moment()
      .hours(8)
      .minutes(0)
      .seconds(0);
    const end = moment(start)
      .hours(17)
      .minutes(0)
      .seconds(0);

    const duration = moment.duration(end.diff(start));
    const overall = duration.asMinutes() - 60;

    record.start = start.valueOf();
    record.end = end.valueOf();
    record.type = 0;
    record.overall = overall;

    return record;
  }

  private recordToFormData(record) {
    const result: any = {};
    const { id, start, end, overall, type, project } = record;

    result.id = id;

    if (start) {
      result.date = moment(start).format('YYYY-MM-DD');
      result.start = this.helper.toHHmm(start);
    }

    if (end) {
      result.end = this.helper.toHHmm(end);
    }

    if (overall) {
      result.overall = this.helper.minutesToHhMm(overall);
      const breakMinutes = this.helper.hhMmToMinutes(result.end) - this.helper.hhMmToMinutes(result.start) - overall;
      result.break = this.helper.minutesToHhMm(breakMinutes);
    }

    if (project) {
      result.project = project;
    }

    if (type) {
      result.type = type;
    }

    return result;
  }

  private formDataToRecord(formData): TimeRecord {
    const { id, date, start, end, overall, type, project, created } = formData;

    const record = {} as TimeRecord;
    const now = moment().valueOf();

    if (id) {
      record.id = id;
    }

    record.created = created ? +created : now;
    record.updated = now;

    if (date && start) {
      record.start = moment(`${date} ${start}`).valueOf();
    } else if (date && !start) {
      record.start = moment(`${date}`).valueOf();
    }

    if (date && end) {
      record.end = moment(`${date} ${end}`).valueOf();
    } else if (date && !end) {
      record.end = moment(`${date}`).valueOf();
    }

    if (overall) {
      record.overall = this.helper.hhMmToMinutes(overall);
    }

    // @todo: why checking to number and casting in next line.
    if (type >= 0) {
      record.type = +type;
    }

    if (project) {
      record.project = project;
    }

    return record;
  }
}
