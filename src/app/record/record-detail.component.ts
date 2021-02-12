import moment from 'moment/moment';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { validateStartEnd } from '../shared/validators/validateStartEnd';
import { UniqueEntryValidator } from '../shared/validators/UniqueEntryValidator';
import { RecordService } from './record.service';
import { TimeRecord } from '../shared/database/TimesheetDatabase';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss'],
})
export class RecordDetailComponent implements OnInit, OnDestroy {
  types$: Observable<any>;
  showDelete = false;
  confirmation = false;
  initialized = false;
  recordForm = this.fb.group(
    {
      id: [''],
      created: [''],
      updated: [''],
      date: [moment().format('YYYY-MM-DD'), Validators.required],
      type: ['0', Validators.required],
      start: ['08:00', Validators.required],
      end: ['17:00', Validators.required],
      overall: ['08:00', Validators.required],
      break: ['01:00', Validators.required],
      project: [''],
    },
    {
      validators: [validateStartEnd],
      asyncValidators: [this.uniqueEntryValidator.validate.bind(this.uniqueEntryValidator)],
    }
  );

  private subscriptions: Subscription[] = [];

  constructor(
    private uniqueEntryValidator: UniqueEntryValidator,
    private recordService: RecordService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.types$ = this.recordService.getTypes();
  }

  ngOnInit() {
    const id = +(this.route.snapshot.paramMap.get('id') || 0);
    this.showDelete = Boolean(id);
    this.setValueChangeListener();

    this.recordService.getRecord(id).subscribe((record) => {
      if (record) {
        this.setControlValues(record);
      }
      this.initialized = true;
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  /**
   * Store entry and go back to previous page.
   */
  public submit(): void {
    this.recordService.addRecord(this.recordForm.value).subscribe(() => this.location.back());
  }

  /**
   * Delete current record, go to previous page afterwards.
   */
  public deleteButtonClicked(): void {
    this.confirmation = true;
  }

  public cancelDelete(): void {
    this.confirmation = false;
  }

  public confirmDelete(): void {
    this.confirmation = true;
    this.recordService.deleteRecord(this.recordForm.controls.id.value).subscribe(() => this.location.back());
  }

  /**
   * Listen for form changes and kick off calculations.
   */
  private setValueChangeListener(): void {
    // Recalculate overall.
    const subscription = this.recordForm.valueChanges.subscribe((): void => {
      const overall = this.recordService.calculateOverall(this.recordForm);
      this.recordForm.controls.overall.patchValue(overall, { emitEvent: false });
    });

    this.subscriptions.push(subscription);
  }

  private setControlValues(record: TimeRecord): void {
    for (const prop in record) {
      if (record.hasOwnProperty(prop)) {
        const control = this.recordForm.get(prop);

        if (control) {
          control.setValue(record[prop]);
        }
      }
    }
  }
}
