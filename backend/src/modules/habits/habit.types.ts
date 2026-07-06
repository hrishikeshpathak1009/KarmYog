export interface CreateHabitInput {
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  frequency?: string;
  targetValue?: number;
  unit?: string;
}

export interface UpdateHabitInput
  extends Partial<CreateHabitInput> {}