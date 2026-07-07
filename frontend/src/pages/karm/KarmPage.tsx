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
} from "../../services/karm.service";
import { deleteHabit } from "../../services/karm.service";

export default function KarmPage() {
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);

  const {
    data: karms = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
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
                      0 / {karm.targetValue}{" "}
                      {karm.unit}
                    </span>

                    <span>0%</span>
                  </div>

                  <div className="h-3 w-full rounded-full bg-gray-200">
                    <div
                      className="h-3 rounded-full bg-blue-600 transition-all"
                      style={{
                        width: "0%",
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-3">

                  <button className="rounded-lg bg-gray-200 px-4 py-2">
                    -
                  </button>

                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                    +
                  </button>

                  <button className="rounded-lg border px-4 py-2">
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

                <button className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700">
                  ✓ Complete
                </button>

                <div className="flex gap-3">

                  <button className="rounded-lg border px-4 py-2">
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
          onClose={() => setShowModal(false)}
          onSubmit={(data) =>
            createKarmMutation.mutate(data)
          }
        />
      )}
    </div>
  );
  
}