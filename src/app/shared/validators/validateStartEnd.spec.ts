import { FormBuilder } from '@angular/forms';
import { validateStartEnd } from './validateStartEnd';

const fb = new FormBuilder();

const createMockGroup = (start = '', end = '', date = '', id = '') => {
  return fb.group({
    date: [date],
    start: [start],
    end: [end],
    id: [id],
  });
};

describe('validateStartEnd', () => {
  it('should return null if start value is empty', () => {
    expect(validateStartEnd(createMockGroup('', '17:00'))).toBeNull();
  });

  it('should return null if end value is empty', () => {
    expect(validateStartEnd(createMockGroup('18:00', ''))).toBeNull();
  });

  it('should return error-object for start >= end', () => {
    const group = createMockGroup('01:00', '01:00');
    expect(validateStartEnd(group)).toEqual({ startEndMismatch: true });
  });

  it('should return null for start < end', () => {
    const group = createMockGroup('01:00', '01:01');
    expect(validateStartEnd(group)).toBeNull();
  });
});
