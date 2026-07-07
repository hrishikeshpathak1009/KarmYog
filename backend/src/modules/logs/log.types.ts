export interface CreateLogInput {
  CompletedValue: number;
  note?: string;
}

export interface UpdateLogInput {
  completedValue: number;
  completed?: boolean;
  skipped?: boolean;
  note?: string;
}