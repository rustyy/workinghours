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
  schema: { [key: string]: string };

  private readonly recordTableName = 'timeRecords';
  private readonly typeTableName = 'timeRecordTypes';
  private readonly recordTable: Dexie.Table<TimeRecord, number>;
  private readonly typeTable: Dexie.Table<TimeRecordType, number>;

  constructor() {
    super(DB_NAME);

    this.schema = {
      [this.recordTableName]: '++id, created, updated, type, start, end, overall, project',
      [this.typeTableName]: '&id, name',
    };

    this.versions();

    this.recordTable = this.table(this.recordTableName);
    this.typeTable = this.table(this.typeTableName);

    this.typeTable
      .bulkPut([
        { id: 0, name: 'default' },
        { id: 1, name: 'illness' },
        { id: 2, name: 'holiday' },
        { id: 3, name: 'public holiday' },
      ] as TimeRecordType[])
      .catch((e) => console.error(e));
  }

  private versions() {
    this.version(1).stores(this.schema);

    // Migrate encoded entities
    this.version(2)
      .stores(this.schema)
      .upgrade((tx) =>
        tx
          .table(this.recordTableName)
          .toCollection()
          .modify((record) => {
            record.project = decodeURIComponent(record.project);
          })
      );
  }

  get records() {
    return this.recordTable;
  }

  get types() {
    return this.typeTable;
  }
}
