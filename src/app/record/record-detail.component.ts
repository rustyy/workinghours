import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { Location } from '@angular/common';
import { ValidatorService } from './validator.service';
import { RecordService } from './record.service';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.scss']
})
export class RecordDetailComponent implements OnInit, OnDestroy {
  types$: Observable<any>;
  showDelete = false;
  confirmation = false;
  initialized = false;
  private subscriptions: Subscription[] = [];

  recordForm = this.fb.group(
    {
      id: [''],
      created: [''],
      updated: [''],
      date: ['', Validators.required],
      type: ['0', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      overall: ['', Validators.required],
      break: ['', Validators.required],
      project: ['']
    },
    {
      validators: [this.validatorService.validateStartEnd()],
      asyncValidators: [this.validatorService.validateUniqueEntry()]
    }
  );

  constructor(
    private recordService: RecordService,
    private validatorService: ValidatorService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.types$ = this.recordService.getTypes();

    this.route.params
      .pipe(take(1))
      .pipe(switchMap(({ id }) => this.recordService.getRecord(+id)))
      .subscribe(record => {
        this.recordService.setControlValues(this.recordForm, record);
        this.initialized = true;
      });

    // @Todo
    this.showDelete = this.router.url !== '/record/add';

    this.setValueChangeListener();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Store entry and go back to previous page.
   */
  public submit(): void {
    this.recordService
      .addRecord(this.recordForm.value)
      .pipe(take(1))
      .subscribe(() => this.location.back());
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

    this.recordService
      .deleteRecord(this.recordForm.controls.id.value)
      .pipe(take(1))
      .subscribe(() => this.location.back());
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
}
