import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SendService } from '../../send/send.service';
import { RecordListService } from '../record-list.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { listToList } from '../../shared/animations/listToList';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss'],
  animations: [trigger('list', [transition('* => *', [useAnimation(listToList)])])]
})
export class RecordListComponent implements OnInit {
  records$: Observable<TimeRecord[]>;
  // @Todo: interface.
  timeRange$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private recordService: RecordListService,
    private sendService: SendService
  ) {}

  ngOnInit(): void {
    this.records$ = this.recordService.recordsByRouteParams(this.route.params);
    this.setYearWeek();
  }

  sendMail(): void {
    this.sendService.mail(this.records$);
  }

  private setYearWeek(): void {
    this.timeRange$ = this.route.params.pipe(
      map(({ year, week }) => this.recordService.mapYearWeek({ year: +year, week: +week })),
      map(x => this.recordService.currentTimeRange(x))
    );
  }
}
