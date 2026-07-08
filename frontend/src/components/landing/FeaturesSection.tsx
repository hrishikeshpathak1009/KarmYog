import dashboardImg from "../../assets/dashboard.png";
import karmImg from "../../assets/karm.png";
import analyticsImg from "../../assets/analytics.png";

export default function FeaturesSection() {
  const features = [
  {
    title: "Dashboard",
    description:
      "Start every day with clarity. Track today's progress and stay focused.",
    badge: "Daily Overview",
    image: dashboardImg,
  },
  {
    title: "Karm",
    description:
      "Manage habits and meaningful tasks effortlessly.",
    badge: "Habits & Tasks",
    image: karmImg,
  },
  {
    title: "Analytics",
    description:
      "Visualize streaks, heatmaps and long-term progress.",
    badge: "Insights",
    image: analyticsImg,
  },
];

  return (
    <section className="bg-white py-">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <h2 className="text-5xl font-bold">
            Everything You Need
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            KarmYog combines planning, discipline and reflection
            into one place so you can focus on consistent action,
            not just chasing outcomes.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-3">

          {features.map((feature) => (
  <div
    key={feature.title}
    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
  >
    {/* Browser Frame */}

    <div className="border-b bg-slate-100 px-4 py-3">

      <div className="flex items-center gap-2">

        <div className="h-3 w-3 rounded-full bg-red-400" />

        <div className="h-3 w-3 rounded-full bg-yellow-400" />

        <div className="h-3 w-3 rounded-full bg-green-400" />

      </div>

    </div>

    {/* Screenshot */}

    <div className="bg-slate-50">

      <img
        src={feature.image}
        alt={feature.title}
        className="h-64 w-full object-cover object-top transition duration-500 hover:scale-105"
      />

    </div>

    {/* Content */}

    <div className="p-6">

      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">

        {feature.badge}

      </span>

      <h3 className="mt-4 text-2xl font-bold text-slate-800">

        {feature.title}

      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">

        {feature.description}

      </p>

    </div>

  </div>
))}

        </div>

      </div>

    </section>
  );
}