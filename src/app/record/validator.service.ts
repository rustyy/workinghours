import { Injectable } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';
import { DatabaseService } from '../shared/database/database.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ValidatorService {
  constructor(private dbService: DatabaseService) {}

  validateStartEnd(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const startVal = control.controls.start.value;
      const endVal = control.controls.end.value;

      if (startVal === '' || endVal === '') {
        return null;
      }

      const startNumeric = +startVal.replace(':', '');
      const endNumeric = +endVal.replace(':', '');

      return startNumeric < endNumeric ? null : { startEndMismatch: true };
    };
  }

  validateBreakOverall(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      if (['00:00', ''].indexOf(control.controls.overall.value) > -1) {
        return {
          overallMismatch: true
        };
      }

      return null;
    };
  }

  validateUniqueEntry(): ValidatorFn {
    return (formGroup: FormGroup): Observable<ValidationErrors | null> => {
      const dateValue = formGroup.controls.date.value;
      const startValue = formGroup.controls.start.value;
      const endValue = formGroup.controls.end.value;
      const id = formGroup.controls.id.value;

      const startOfDay = moment(dateValue).valueOf();
      const endOfDay = moment(`${dateValue} 23:59:59.999`, 'YYYY-MM-DD HH:mm:ss.SSS').valueOf();
      const start = moment(`${dateValue} ${startValue}`, 'YYYY-MM-DD HH:mm').valueOf();
      const end = moment(`${dateValue} ${endValue}`, 'YYYY-MM-DD HH:mm').valueOf();

      return this.dbService.getRecordsInTimeRange(startOfDay, endOfDay).pipe(
        map(records => {
          const conflictingRecords = records
            // Ignore if record being edited.
            .filter(record => record.id !== id)
            // Filter conflicting time windows.
            .filter(record => record.start < end && record.end > start);

          return conflictingRecords.length ? { conflictingRecord: conflictingRecords } : null;
        })
      );
    };
  }
}
