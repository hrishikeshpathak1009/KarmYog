import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import AddKarmModal from "../../components/karm/AddKarmModal";
 import { updateHabit } from "../../services/karm.service";

import {
  getHabits,
  createHabit,
} from "../../services/karm.service";
import { deleteHabit } from "../../services/karm.service";
import {
  incrementHabit,
  decrementHabit,
  completeHabit,
} from "../../services/karm.service";




export default function KarmPage() {
  const queryClient = useQueryClient();

  const [editingKarm, setEditingKarm] =
  useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const {
    data: karms = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
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

    setEditingKarm(null);
    setShowModal(false);
  },
});
  const createKarmMutation = useMutation({
    mutationFn: createHabit,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });

      setShowModal(false);
    },

    onError: (err) => {
      console.error(err);
      alert("Failed to create Karm");
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
  },

  onError: () => {
    alert("Failed to delete Karm");
  },
});

const incrementMutation = useMutation({
  mutationFn: incrementHabit,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["dashboard"],
    });

    queryClient.invalidateQueries({
      queryKey: ["habits"],
    });
  },
});

const decrementMutation = useMutation({
  mutationFn: decrementHabit,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["dashboard"],
    });

    queryClient.invalidateQueries({
      queryKey: ["habits"],
    });
  },
});

const completeMutation = useMutation({
  mutationFn: completeHabit,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["dashboard"],
    });

    queryClient.invalidateQueries({
      queryKey: ["habits"],
    });
  },
});


  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Failed to load Karm.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            My Karm
          </h1>

          <p className="text-gray-500">
            Every action shapes your future.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Add Karm
        </button>
      </div>

      {karms.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow">
          <h2 className="text-2xl font-semibold">
            No Karm Yet
          </h2>

          <p className="mt-3 text-gray-500">
            Begin your journey by creating your first Karm.
          </p>

          <button
            onClick={() => setShowModal(true)}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white"
          >
            Create First Karm
          </button>
        </div>
      )}

      <div className="space-y-5">
        {karms.map((karm: any) => (
          <div
            key={karm.id}
            className="rounded-2xl bg-white p-6 shadow"
          >
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-semibold">
                  {karm.title}
                </h2>

                {karm.description && (
                  <p className="mt-1 text-gray-500">
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
                      {karm.today.completedValue} / {karm.targetValue}
                      {" "}
                      {karm.unit}
                    </span>

                    <span>{Math.round(
  (karm.today.completedValue /
    karm.targetValue) *
    100
)}
%</span>
                  </div>

                  <div className="h-3 w-full rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-blue-600 transition-all"
                      style={{
                        width: `${
  Math.min(
    (karm.today.completedValue /
      karm.targetValue) *
      100,
    100
  )
}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-3">

                  <button className="rounded-lg bg-gray-200 px-4 py-2" onClick={() =>
    decrementMutation.mutate(karm.id)
  }>
                    -
                  </button>

                  <button  onClick={() =>
    incrementMutation.mutate(karm.id)
  }className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                    +
                  </button>

                 <button
  onClick={() => {
    setEditingKarm(karm);
    setShowModal(true);
  }}
  className="rounded-lg border px-4 py-2"
>
  Edit
</button>

                  <button
  onClick={() => {
    if (window.confirm("Delete this Karm?")) {
      deleteMutation.mutate(karm.id);
    }
  }}
  className="rounded-lg border border-red-400 px-4 py-2 text-red-500 hover:bg-red-50"
>
  Delete
</button>

                </div>
              </>
            ) : (
              <div className="mt-6 flex items-center justify-between">

                <button
  disabled={karm.today.completed}
  onClick={() =>
    completeMutation.mutate(karm.id)
  }
  className={`rounded-lg px-5 py-2 text-white ${
    karm.today.completed
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  {karm.today.completed
    ? "✓ Completed Today"
    : "✓ Completed"}
</button>

                <div className="flex gap-3">

                  <button
  onClick={() => {
    setEditingKarm(karm);
    setShowModal(true);
  }}
  className="rounded-lg border px-4 py-2"
>
  Edit
</button>

                  <button
  onClick={() => {
    if (window.confirm("Delete this Karm?")) {
      deleteMutation.mutate(karm.id);
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
        ))}
      </div>

      {showModal && (
  <AddKarmModal
    mode={editingKarm ? "edit" : "create"}
    initialData={editingKarm ?? undefined}
    onClose={() => {
      setShowModal(false);
      setEditingKarm(null);
    }}
    onSubmit={(data) => {
      if (editingKarm) {
        updateMutation.mutate({
          id: editingKarm.id,
          data,
        });
      } else {
        createKarmMutation.mutate(data);
      }
    }}
  />
)}
    </div>
  );
  
}