import Dexie from 'dexie';
import { ITimeRecordType } from '../../../types/ITimeRecordType';

const DB_NAME = 'TimesheetDatabase';

export interface ITimeRecord {
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
  private readonly recordTable: Dexie.Table<ITimeRecord, number>;

  constructor() {
    super(DB_NAME);

    this.schema = {
      [this.recordTableName]: '++id, created, updated, type, start, end, overall, project',
    };

    this.versions();

    this.recordTable = this.table(this.recordTableName);
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

    // Migrate 'undefined' projects
    this.version(3)
      .stores(this.schema)
      .upgrade((tx) =>
        tx
          .table(this.recordTableName)
          .toCollection()
          .modify((record) => {
            if (record.project === 'undefined') {
              delete record.project;
            }
          })
      );

    // remove 'type' object store
    this.version(4).stores(this.schema);
  }

  get records() {
    return this.recordTable;
  }
}
