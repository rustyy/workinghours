import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import moment from 'moment';
import { HelperService } from '../shared/helper/helper.service';
import { FormGroup } from '@angular/forms';
import { DatabaseService } from '../shared/database/database.service';
import { TranslateService } from '@ngx-translate/core';
import { ITimeRecordType } from '../../types/ITimeRecordType';
import { ITimeRecord } from '../shared/database/TimesheetDatabase';

interface FormData {
  date: string;
  start: string;
  end: string;
  break: string;
  overall: string;
  type: string;
  project?: string;
  created?: string;
  updated?: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(
    private databaseService: DatabaseService,
    private helper: HelperService,
    private translateService: TranslateService
  ) {}

  public getRecord(id: number): Observable<ITimeRecord | undefined> {
    return this.databaseService.getRecord(id).pipe(
      map((record) => {
        if (record) {
          return this.recordToFormData(record);
        }
      })
    );
  }

  public addRecord(formData: FormData): Observable<number> {
    const record = this.formDataToRecord(formData);
    return this.databaseService.addRecord(record).pipe(take(1));
  }

  public deleteRecord(id: number): Observable<void> {
    return this.databaseService.deleteRecord(id).pipe(take(1));
  }

  public calculateOverall(fg: FormGroup): string {
    const start: string = fg.controls['start'].value;
    const end: string = fg.controls['end'].value;
    const breakVal: string = fg.controls['break'].value;

    const s = this.helper.hhMmToMinutes(start);
    const e = this.helper.hhMmToMinutes(end);
    const b = this.helper.hhMmToMinutes(breakVal);
    const overall = e - s - b;
    return overall >= 0 ? this.helper.minutesToHhMm(overall) : '';
  }

  public getTypes(): Observable<any[]> {
    const types$ = this.databaseService.getTypes();
    const typesTranslations$ = this.translateService.get('TYPES');

    const mapTranslations = (data: [ITimeRecordType[], string[]]): ITimeRecordType[] => {
      const [types, translations] = data;

      return types.map((type: ITimeRecordType) => {
        // @ts-ignore
        type.name = translations[`type${type.id}`];
        return type;
      });
    };

    return forkJoin([types$, typesTranslations$]).pipe(map(mapTranslations));
  }

  private recordToFormData(record: ITimeRecord) {
    const result: any = {};
    const { id, start, end, overall, type, project, created, updated } = record;

    result.id = id;
    result.created = created;
    result.updated = updated;

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

  private formDataToRecord(formData: FormData): ITimeRecord {
    const { id, date, start, end, overall, type, project, created } = formData;
    const now = moment().valueOf();

    const record: ITimeRecord = {
      id: id ? +id : undefined,
      created: created ? +created : now,
      updated: now,
      start: moment(`${date} ${start}`).valueOf(),
      end: moment(`${date} ${end}`).valueOf(),
      type: +type,
      overall: this.helper.hhMmToMinutes(overall),
      project: project ? project : undefined,
    };

    return JSON.parse(JSON.stringify(record));
  }
}
