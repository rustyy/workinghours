import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    const hours = Math.floor(value / 60);
    const hoursString = hours === 0 ? '00' : hours < 10 ? `0${hours}` : hours;
    const minutes = value % 60;
    const minutesString = minutes === 0 ? '00' : minutes < 10 ? `0${minutes}` : minutes;

    return `${hoursString}:${minutesString}`;
  }
}
