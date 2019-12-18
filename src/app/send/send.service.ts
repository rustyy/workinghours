import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { SettingsService } from '../settings/settings.service';
import { HelperService } from '../shared/helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class SendService {
  constructor(
    private helperService: HelperService,
    private settingsService: SettingsService,
    private translateService: TranslateService
  ) {}

  mailUrl(records$: Observable<TimeRecord[]>): Observable<string> {
    const translations$ = this.translateService.get([
      'TYPES',
      'DETAIL.PROJECT',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa',
      'Su'
    ]);
    return combineLatest([records$, translations$]).pipe(map(this.mapper.bind(this)));
  }

  private mapper([records, translations]) {
    const mail = this.settingsService.get('email');
    const name = this.settingsService.get('name');
    const mailBody = records.map(this.buildMailBody(translations));

    return `mailto:${mail}?subject=workinghours&body=${escape(name)}${escape(mailBody.join(''))}`;
  }

  private buildMailBody(translations) {
    return record => {
      const day = translations[moment(record.start).format('dd')] + ' ' + moment(record.start).format('DD.MM.YYYY');
      const start = moment(record.start).format('HH:mm');
      const end = moment(record.end).format('HH:mm');
      const project = record.project || '--';
      const { type } = record;

      const startEnd = type > 0 ? translations[`type${type}`] : `${start} - ${end}`;
      const overall = type > 0 ? '' : `${this.helperService.minutesToHhMm(record.overall)}h`;

      const lines = [
        [day, startEnd, overall].filter(id => id).join('          '),
        `${translations['DETAIL.PROJECT']}: ${project}`,
        '________________________________________'
      ].join('\n');

      return '\n' + lines + '\n';
    };
  }
}
