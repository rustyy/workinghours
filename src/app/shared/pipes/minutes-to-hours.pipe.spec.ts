import { TestBed } from '@angular/core/testing';
import { MinutesToHoursPipe } from './minutes-to-hours.pipe';
import { HelperService } from '../helper/helper.service';

describe('minutes-to-hours.pipe', () => {
  let pipe: MinutesToHoursPipe;
  let helperServiceSpy: jasmine.SpyObj<HelperService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HelperService', ['minutesToHhMm']);

    TestBed.configureTestingModule({
      providers: [{ provide: HelperService, useValue: spy }]
    });

    helperServiceSpy = TestBed.get(HelperService);
    pipe = new MinutesToHoursPipe(helperServiceSpy);
  });

  it('calls HelperService.minutesToHhMm to transform number to time-string', () => {
    const stubValue = '01:30';
    helperServiceSpy.minutesToHhMm.and.returnValue(stubValue);

    expect(pipe.transform(90)).toBe(stubValue);
    expect(helperServiceSpy.minutesToHhMm.calls.count()).toBe(1);
  });
});
