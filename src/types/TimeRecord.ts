export interface TimeRecord {
  id?: number;
  type: number;
  typeName?: string;
  start: number;
  end: number;
  overall: number;
  project?: string;
  created?: number;
  updated?: number;
}
