declare type TimeRecordName = 'default' | 'illness' | 'holiday' | 'public holiday';

declare interface TimeRecordType {
  id?: number;
  name: TimeRecordName;
}
