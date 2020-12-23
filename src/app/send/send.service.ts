// @ts-nocheck
import { Injectable } from '@angular/core';
import moment from 'moment';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { TimeRecord } from '../../types/TimeRecord';
import { SettingsService } from '../settings/settings.service';
import { HelperService } from '../shared/helper/helper.service';

@Injectable({
  providedIn: 'root',
})
export class SendService {
  constructor(
    private helperService: HelperService,
    private settingsService: SettingsService,
    private translateService: TranslateService
  ) {}

  static formatDay(time: string, dayMapping: object): string {
    const s = moment(time);
    const dayShort = s.format('dd');
    const date = s.format('DD.MM.YYYY');
    return `${dayMapping[dayShort]} ${date}`;
  }

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
      'Su',
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
    return ({ type, start, end, overall, project }) => {
      const d = SendService.formatDay(start, translations);
      const s = moment(start).format('HH:mm');
      const e = moment(end).format('HH:mm');
      const startEnd = type > 0 ? translations[`type${type}`] : `${s} - ${e}`;
      const o = type > 0 ? '' : `${this.helperService.minutesToHhMm(overall)}h`;

      const lines = [
        [d, startEnd, o].filter((id) => id).join('          '),
        `${translations['DETAIL.PROJECT']}: ${project || '--'}`,
        '________________________________________',
      ].join('\n');

      return '\n' + lines + '\n';
    };
  }
}
