export interface CreateLogInput {
  CompletedValue: number;
  note?: string;
}

export interface UpdateLogInput
  extends Partial<CreateLogInput> {}