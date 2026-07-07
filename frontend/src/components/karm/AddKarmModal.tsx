import { useState } from "react";

interface AddKarmModalProps {
  onClose: () => void;

  onSubmit: (data: {
    title: string;
    description?: string;
    kind: "habit" | "task";
    frequency: "daily" | "weekly" | "monthly" | "none";
    dueDate?: string;
    type: "progress" | "completion";
    targetValue?: number;
    unit?: string;
  }) => void;

  initialData?: {
    id?: string;
    title: string;
    description?: string;
    kind: "habit" | "task";
    frequency: "daily" | "weekly" | "monthly" | "none";
    dueDate?: string;
    type: "progress" | "completion";
    targetValue?: number;
    unit?: string;
  };

  mode?: "create" | "edit";
}

export default function AddKarmModal({
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}: AddKarmModalProps) {
  const [title, setTitle] = useState(
    initialData?.title ?? ""
  );

  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );

  const [kind, setKind] = useState<
    "habit" | "task"
  >(initialData?.kind ?? "habit");

  const [frequency, setFrequency] = useState<
    "daily" | "weekly" | "monthly" | "none"
  >(initialData?.frequency ?? "daily");

  const [dueDate, setDueDate] = useState(
    initialData?.dueDate ?? ""
  );

  const [type, setType] = useState<
    "progress" | "completion"
  >(initialData?.type ?? "progress");

  const [targetValue, setTargetValue] = useState(
    initialData?.targetValue ?? 1
  );

  const [unit, setUnit] = useState(
    initialData?.unit ?? "times"
  );

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    onSubmit({
      title,
      description,

      kind,

      frequency:
        kind === "task"
          ? "none"
          : frequency,

      dueDate:
        kind === "task"
          ? dueDate
          : undefined,

      type,

      targetValue:
        type === "progress"
          ? targetValue
          : 1,

      unit:
        type === "progress"
          ? unit
          : "times",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-3xl font-bold">

          {mode === "edit"
            ? "Edit Karm"
            : "Create New Karm"}

        </h2>

        <input
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          className="mb-6 w-full rounded-lg border p-3"
          rows={3}
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <div className="mb-6">

          <h3 className="mb-2 font-semibold">
            How should this Karm behave?
          </h3>

          <div className="flex gap-6">

            <label className="flex items-center gap-2">

              <input
                type="radio"
                checked={kind === "habit"}
                onChange={() =>
                  setKind("habit")
                }
              />

              Habit

            </label>

            <label className="flex items-center gap-2">

              <input
                type="radio"
                checked={kind === "task"}
                onChange={() =>
                  setKind("task")
                }
              />

              One-time Task

            </label>

          </div>

        </div>

        {kind === "habit" ? (
          <div className="mb-6">

            <label className="mb-2 block font-semibold">
              Repeat
            </label>

            <select
              value={frequency}
              onChange={(e) =>
                setFrequency(
                  e.target.value as any
                )
              }
              className="w-full rounded-lg border p-3"
            >

              <option value="daily">
                Daily
              </option>

              <option value="weekly">
                Weekly
              </option>

              <option value="monthly">
                Monthly
              </option>

            </select>

          </div>
        ) : (
          <div className="mb-6">

            <label className="mb-2 block font-semibold">
              Due Date
            </label>

            <input
              type="date"
              className="w-full rounded-lg border p-3"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
            />

          </div>
        )}

        {kind === "habit" && (
          <>
            <div className="mb-6">

              <h3 className="mb-2 font-semibold">
                Tracking Type
              </h3>

              <div className="flex gap-6">

                <label className="flex items-center gap-2">

                  <input
                    type="radio"
                    checked={
                      type === "progress"
                    }
                    onChange={() =>
                      setType("progress")
                    }
                  />

                  Progress

                </label>

                <label className="flex items-center gap-2">

                  <input
                    type="radio"
                    checked={
                      type === "completion"
                    }
                    onChange={() =>
                      setType("completion")
                    }
                  />

                  Completion

                </label>

              </div>

            </div>

            {type === "progress" && (
              <>
                <input
                  type="number"
                  className="mb-4 w-full rounded-lg border p-3"
                  placeholder="Target Value"
                  value={targetValue}
                  onChange={(e) =>
                    setTargetValue(
                      Number(e.target.value)
                    )
                  }
                />

                <input
                  className="mb-6 w-full rounded-lg border p-3"
                  placeholder="Unit"
                  value={unit}
                  onChange={(e) =>
                    setUnit(e.target.value)
                  }
                />
              </>
            )}
          </>
        )}

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            {mode === "edit"
              ? "Save Changes"
              : "Create Karm"}
          </button>

        </div>

      </div>

    </div>
  );
}