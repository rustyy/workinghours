export type TimeRecordName = 'default' | 'illness' | 'holiday' | 'public holiday';

export interface TimeRecordType {
  id?: number;
  name: TimeRecordName;
}
