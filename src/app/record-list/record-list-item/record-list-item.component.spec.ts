import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RecordListItemComponent } from './record-list-item.component';

describe('RecordListItemComponent', () => {
  let component: RecordListItemComponent;
  let fixture: ComponentFixture<RecordListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecordListItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
