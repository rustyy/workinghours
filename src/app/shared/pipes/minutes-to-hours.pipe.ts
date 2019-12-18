import { Pipe, PipeTransform } from '@angular/core';
import { HelperService } from '../helper/helper.service';

@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {
  constructor(private helperService: HelperService) {}

  transform(value: number, args?: any): any {
    return this.helperService.minutesToHhMm(value);
  }
}
