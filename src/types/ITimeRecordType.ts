export type TimeRecordName = 'default' | 'illness' | 'holiday' | 'public holiday';

export interface ITimeRecordType {
  id?: number;
  name: TimeRecordName;
}
