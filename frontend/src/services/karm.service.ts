import api from "./api";

export interface CreateHabitPayload {
  title: string;
  description?: string;
  type: "progress" | "completion";
  targetValue?: number;
  unit?: string;
}

export const getHabits = async () => {
  const response = await api.get("/habits");
  return response.data.habits;
};

export const getHabitById = async (id: string) => {
  const response = await api.get(`/habits/${id}`);
  return response.data.habits;
};

export const createHabit = async (
  data: CreateHabitPayload
) => {
  const response = await api.post("/habits", data);
  return response.data;
};

export const updateHabit = async (
  id: string,
  data: Partial<CreateHabitPayload>
) => {
  const response = await api.patch(
    `/habits/${id}`,
    data
  );

  return response.data;
};

export const deleteHabit = async (id: string) => {
  const response = await api.delete(
    `/habits/${id}`
  );

  return response.data;
};

export const incrementHabit = async (
  habitId: string
) => {
  const response = await api.post(
    `/logs/${habitId}/increment`
  );

  return response.data.log;
};

export const decrementHabit = async (
  habitId: string
) => {
  const response = await api.post(
    `/logs/${habitId}/decrement`
  );

  return response.data.log;
};

export const completeHabit = async (
  habitId: string
) => {
  const response = await api.post(
    `/logs/${habitId}/complete`
  );

  return response.data.log;
};