import { MinutesToHoursPipe } from './minutes-to-hours.pipe';

describe('MinutesToHoursPipe', () => {
  it('create an instance', () => {
    const pipe = new MinutesToHoursPipe();
    expect(pipe).toBeTruthy();
  });
});
