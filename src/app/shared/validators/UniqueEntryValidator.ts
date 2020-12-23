import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { DatabaseService } from '../database/database.service';
import { Observable } from 'rxjs';

import moment from 'moment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UniqueEntryValidator implements AsyncValidator {
  constructor(private dbService: DatabaseService) {}

  private static valueOf(value: moment.MomentInput, format?: string) {
    return moment(value, format).valueOf();
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const dateValue = control.get('date')?.value;
    const startValue = control.get('start')?.value;
    const endValue = control.get('end')?.value;
    const id = control.get('id')?.value;

    const format = 'YYYY-MM-DD HH:mm';
    const startOfDay = UniqueEntryValidator.valueOf(dateValue);
    const endOfDay = UniqueEntryValidator.valueOf(`${dateValue} 23:59:59.999`, 'YYYY-MM-DD HH:mm:ss.SSS');
    const start = UniqueEntryValidator.valueOf(`${dateValue} ${startValue}`, format);
    const end = UniqueEntryValidator.valueOf(`${dateValue} ${endValue}`, format);

    return this.dbService.getRecordsInTimeRange(startOfDay, endOfDay).pipe(
      map((records) => {
        const conflictingRecords = records
          // Ignore if record being edited.
          .filter((record) => record.id !== id)
          // Filter conflicting time windows.
          .filter((record) => record.start < end && record.end > start);

        return conflictingRecords.length ? { conflictingRecord: conflictingRecords } : null;
      })
    );
  }
}
