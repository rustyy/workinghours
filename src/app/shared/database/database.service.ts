import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import { ITimeRecord, TimesheetDatabase } from './TimesheetDatabase';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private readonly db: TimesheetDatabase;

  constructor() {
    this.db = new TimesheetDatabase();
  }

  public addRecord(record: ITimeRecord) {
    return from(this.db.records.put(record));
  }

  public deleteRecord(id: number) {
    return from(this.db.records.delete(id));
  }

  public getRecord(id: number) {
    return from(this.db.records.get({ id }));
  }

  public getRecordsInTimeRange(timestampStart: number, timestampEnd: number) {
    return from(
      this.db.records
        .where('start')
        .aboveOrEqual(timestampStart)
        .and((row) => row.end <= timestampEnd)
        .toArray()
    );
  }

  public getConflictingRecords({ start, end, id }: { start: number; end: number; id: number }) {
    return from(
      this.db.records
        .where('id')
        .notEqual(id)
        .filter((record) => record.start < end && record.end > start)
        .toArray()
    );
  }
}
