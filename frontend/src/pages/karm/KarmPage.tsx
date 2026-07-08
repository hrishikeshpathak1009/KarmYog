import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import AddKarmModal from "../../components/karm/AddKarmModal";

import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  incrementHabit,
  decrementHabit,
  completeHabit,
} from "../../services/karm.service";

import { getAnalytics } from "../../services/analytics.service";

export default function KarmPage() {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] =
    useState(false);

  const [editingKarm, setEditingKarm] =
    useState<any>(null);

  // ---------------------------------
  // Queries
  // ---------------------------------

  const {
    data: karms = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
  });

  const { data: analytics } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
  });

  // ---------------------------------
  // Mutations
  // ---------------------------------

  const createMutation = useMutation({
    mutationFn: createHabit,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });

      setShowModal(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) => updateHabit(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });

      setEditingKarm(null);
      setShowModal(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteHabit,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
  });

  const incrementMutation = useMutation({
    mutationFn: incrementHabit,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
  });

  const decrementMutation = useMutation({
    mutationFn: decrementHabit,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
  });

  const completeMutation = useMutation({
    mutationFn: completeHabit,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["analytics"],
      });
    },
  });

  // ---------------------------------
  // Loading
  // ---------------------------------

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        Loading  your Karms...
        
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load Karm.
      </div>
    );
  }

  // ---------------------------------
  // Streak Lookup
  // ---------------------------------

  const streakMap = new Map();

  analytics?.topStreaks?.forEach(
    (item: any) => {
      streakMap.set(item.id, item);
    }
  );

  // ---------------------------------
  // UI
  // ---------------------------------

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            My Karm
          </h1>

          <p className="text-gray-500">
            कर्म प्रधान विश्व रचि राखा, जो जस करहि सो तस फल चाखा
          </p>

        </div>

        <button
          onClick={() => {
            setEditingKarm(null);
            setShowModal(true);
          }}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Add Karm
        </button>

      </div>

      {karms.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow">

          <h2 className="text-2xl font-semibold">
            Begin Your Journey
          </h2>

          <p className="mt-4 text-gray-500">
            Every great life is built one
            action at a time.
          </p>

          <button
            onClick={() => {
              setEditingKarm(null);
              setShowModal(true);
            }}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white"
          >
            Create First Karm
          </button>

        </div>
      )}

      <div className="space-y-5">

        {karms.map((karm: any) => {

          const streak =
            streakMap.get(karm.id);

          const completedValue =
            karm.today?.completedValue ?? 0;

          const targetValue =
            Math.max(
              karm.targetValue ?? 1,
              1
            );

          const progress =
            karm.type === "completion"
              ? karm.today?.completed
                ? 100
                : 0
              : Math.min(
                  100,
                  Math.round(
                    (completedValue /
                      targetValue) *
                      100
                  )
                );

          return (<div
  key={karm.id}
  className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
>
  <div className="flex items-start justify-between">

    <div>

      <div className="flex items-center gap-3">

        <h2 className="text-2xl font-semibold">
          {karm.title}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            karm.kind === "habit"
              ? "bg-purple-100 text-purple-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {karm.kind === "habit"
            ? "Habit"
            : "Task"}
        </span>

      </div>

      {streak && (
        <div className="mt-2 flex gap-5 text-sm text-gray-500">

          <span>
            🔥 {streak.currentStreak} day
            {streak.currentStreak !== 1
              ? "s"
              : ""}
          </span>

          <span>
            🏆 Best {streak.bestStreak}
          </span>

        </div>
      )}

      {karm.description && (
        <p className="mt-2 text-gray-500">
          {karm.description}
        </p>
      )}

    </div>

    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        karm.type === "completion"
          ? "bg-green-100 text-green-700"
          : "bg-blue-100 text-blue-700"
      }`}
    >
      {karm.type === "completion"
        ? "Completion"
        : "Progress"}
    </span>

  </div>

  {karm.type === "progress" ? (
    <>
      <div className="mt-6">

        <div className="mb-2 flex justify-between">

          <span>
            {completedValue} / {targetValue}
            {" "}
            {karm.unit}
          </span>

          <span>
            {progress}%
          </span>

        </div>

        <div className="h-3 w-full rounded-full bg-gray-200">

          <div
            className="h-3 rounded-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          onClick={() =>
            decrementMutation.mutate(
              karm.id
            )
          }
          className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          −
        </button>

        <button
          onClick={() =>
            incrementMutation.mutate(
              karm.id
            )
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          +
        </button>

        <button
          onClick={() => {
            setEditingKarm(karm);
            setShowModal(true);
          }}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          Edit
        </button>

        <button
          onClick={() => {
            if (
              window.confirm(
                "Delete this Karm?"
              )
            ) {
              deleteMutation.mutate(
                karm.id
              );
            }
          }}
          className="rounded-lg border border-red-400 px-4 py-2 text-red-500 hover:bg-red-50"
        >
          Delete
        </button>

      </div>
    </>
  ) : (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">

      <button
        disabled={karm.today?.completed}
        onClick={() =>
          completeMutation.mutate(
            karm.id
          )
        }
        className={`rounded-lg px-5 py-2 text-white ${
          karm.today?.completed
            ? "cursor-not-allowed bg-gray-400"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {karm.today?.completed
          ? "✓ Completed Today"
          : "✓ Complete"}
      </button>

      <div className="flex gap-3">

        <button
          onClick={() => {
            setEditingKarm(karm);
            setShowModal(true);
          }}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          Edit
        </button>

        <button
          onClick={() => {
            if (
              window.confirm(
                "Delete this Karm?"
              )
            ) {
              deleteMutation.mutate(
                karm.id
              );
            }
          }}
          className="rounded-lg border border-red-400 px-4 py-2 text-red-500 hover:bg-red-50"
        >
          Delete
        </button>

      </div>

    </div>
  )}

</div>
);
})}

</div>

{showModal && (
  <AddKarmModal
    mode={
      editingKarm
        ? "edit"
        : "create"
    }
    initialData={
      editingKarm ?? undefined
    }
    onClose={() => {
      setEditingKarm(null);
      setShowModal(false);
    }}
    onSubmit={(data) => {
      if (editingKarm) {
        updateMutation.mutate({
          id: editingKarm.id,
          data,
        });
      } else {
        createMutation.mutate(data);
      }
    }}
  />
)}

</div>
);
}