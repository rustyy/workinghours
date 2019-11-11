import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SettingsService } from '../settings/settings.service';
import { HelperService } from '../shared/helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class SendService {
  constructor(private helperService: HelperService, private settingsService: SettingsService) {}

  mail(records$: Observable<TimeRecord[]>) {
    const mail = this.settingsService.getSetting('email');
    const name = this.settingsService.getSetting('name');

    records$.pipe(take(1)).subscribe(records => {
      let location = `mailto:${mail}?subject=workinghours`;

      const mailBody = records.map(record => {
        const day = moment(record.start).format('dd DD.MM.YYYY');
        const start = moment(record.start).format('HH:mm');
        const end = moment(record.end).format('HH:mm');
        const overall = this.helperService.minutesToHhMm(record.overall);
        const project = record.project || '--';

        return `\n${day} ---- ${start} - ${end} ---- ${overall}h\nProject: ${project}\n________________________________________\n`;
      });

      location += `&body=${escape(name)}${escape(mailBody.join(''))}`;
      window.location.href = location;
    });
  }
}
