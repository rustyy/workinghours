import Dexie from 'dexie';
import { TimeRecordType } from '../../../types/TimeRecordType';

const DB_NAME = 'TimesheetDatabase';

export interface TimeRecord {
  [key: string]: any;
  id?: number;
  project?: string;
  created?: number;
  updated?: number;
  type: number;
  start: number;
  end: number;
  overall: number;
}

export class TimesheetDatabase extends Dexie {
  private readonly VERSION = 1;
  private readonly RECORD_TABLE_NAME = 'timeRecords';
  private readonly TYPE_TABLE_NAME = 'timeRecordTypes';
  private readonly recordTable: Dexie.Table<TimeRecord, number>;
  private readonly typeTable: Dexie.Table<TimeRecordType, number>;

  schema = {
    [this.RECORD_TABLE_NAME]: '++id, created, updated, type, start, end, overall, project',
    [this.TYPE_TABLE_NAME]: '&id, name',
  };

  constructor() {
    super(DB_NAME);
    this.version(this.VERSION).stores(this.schema);
    this.recordTable = this.table(this.RECORD_TABLE_NAME);
    this.typeTable = this.table(this.TYPE_TABLE_NAME);

    this.typeTable
      .bulkPut([
        { id: 0, name: 'default' },
        { id: 1, name: 'illness' },
        { id: 2, name: 'holiday' },
        { id: 3, name: 'public holiday' },
      ] as TimeRecordType[])
      .catch((e) => console.error(e));
  }

  get records() {
    return this.recordTable;
  }

  get types() {
    return this.typeTable;
  }
}
