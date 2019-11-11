import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SendService } from '../../send/send.service';
import { RecordListService } from '../record-list.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss']
})
export class RecordListComponent implements OnInit {
  records$: Observable<TimeRecord[]>;
  // @Todo: interface.
  timeRange$: Observable<any>;
  records: TimeRecord[];

  constructor(
    private route: ActivatedRoute,
    private recordService: RecordListService,
    private sendService: SendService
  ) {}

  ngOnInit() {
    this.setRecords();
    this.setYearWeek();
  }

  onSendClicked(): void {
    this.sendService.mail(this.records$);
  }

  private setRecords(): void {
    this.records$ = this.route.params.pipe(
      map(({ year, week }) => this.recordService.mapYearWeek({ year, week })),
      switchMap(o => this.recordService.getRecords(o))
    );
  }

  private setYearWeek(): void {
    this.timeRange$ = this.route.params.pipe(
      map(({ year, week }) => this.recordService.mapYearWeek({ year: +year, week: +week })),
      map(x => this.recordService.currentTimeRange(x))
    );
  }
}
