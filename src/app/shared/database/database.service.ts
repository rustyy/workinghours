import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { TimesheetDatabase } from './TimesheetDatabase';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly db: TimesheetDatabase;

  constructor() {
    this.db = new TimesheetDatabase();
  }

  public addRecord(record: TimeRecord): Observable<number> {
    return from(this.db.records.put(record));
  }

  public deleteRecord(id: number): Observable<void> {
    return from(this.db.records.delete(id));
  }

  public getRecord(id: number): Observable<any> {
    return from(this.db.records.get({ id }));
  }

  public getRecordsInTimeRange(start, end) {
    return from(
      this.db.records
        .where('start')
        .aboveOrEqual(start)
        .and(row => row.end <= end)
        .toArray()
    );
  }

  public getTypes(): Observable<any[]> {
    return from(this.db.types.toArray());
  }
}
