import { AbstractControl, ValidatorFn } from '@angular/forms';

export const validateStartEnd: ValidatorFn = (control: AbstractControl) => {
  const start = control.get('start')?.value;
  const end = control.get('end')?.value;

  if (!(start && end)) {
    return null;
  }

  const startNumeric = +start.replace(':', '');
  const endNumeric = +end.replace(':', '');

  return startNumeric < endNumeric ? null : { startEndMismatch: true };
};
