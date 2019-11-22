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
    const types$ = this.translateService.get(`TYPES`);
    return combineLatest([records$, types$]).pipe(map(this.mapper.bind(this)));
  }

  private mapper([records, typeTranslations]) {
    const mail = this.settingsService.getSetting('email');
    const name = this.settingsService.getSetting('name');
    const mailBody = records.map(this.buildMailBody(typeTranslations));

    return `mailto:${mail}?subject=workinghours&body=${escape(name)}${escape(mailBody.join(''))}`;
  }

  private buildMailBody(typeTranslations) {
    return record => {
      const day = moment(record.start).format('dd DD.MM.YYYY');
      const start = moment(record.start).format('HH:mm');
      const end = moment(record.end).format('HH:mm');
      const project = record.project || '--';
      const { type } = record;

      const startEnd = type > 0 ? typeTranslations[`type${type}`] : `${start} - ${end}`;
      const overall = type > 0 ? '' : `${this.helperService.minutesToHhMm(record.overall)}h`;

      const lines = [
        [day, startEnd, overall].filter(id => id).join('          '),
        `Project: ${project}`,
        '________________________________________'
      ].join('\n');

      return '\n' + lines + '\n';
    };
  }
}
