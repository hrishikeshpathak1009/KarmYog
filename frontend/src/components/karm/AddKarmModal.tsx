import { useState } from "react";

interface AddKarmModalProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description?: string;
    type: "progress" | "completion";
    targetValue?: number;
    unit?: string;
  }) => void;
}

export default function AddKarmModal({
  onClose,
  onSubmit,
}: AddKarmModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isCompletion, setIsCompletion] =
    useState(false);

  const [targetValue, setTargetValue] =
    useState(1);

  const [unit, setUnit] = useState("times");

  const handleSubmit = () => {
    onSubmit({
      title,
      description,

      type: isCompletion
        ? "completion"
        : "progress",

      targetValue: isCompletion
        ? undefined
        : targetValue,

      unit: isCompletion
        ? undefined
        : unit,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Create New Karm
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
          className="mb-4 w-full rounded-lg border p-3"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <label className="mb-5 flex items-center gap-3">

          <input
            type="checkbox"
            checked={isCompletion}
            onChange={(e) =>
              setIsCompletion(e.target.checked)
            }
          />

          This Karm only needs to be completed

        </label>

        {!isCompletion && (
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

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Create Karm
          </button>

        </div>

      </div>

    </div>
  );
}