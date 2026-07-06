import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}

      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6">

        <h1 className="text-3xl font-bold text-blue-600">
          KarmYog
        </h1>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="rounded-lg px-5 py-2 hover:bg-slate-200"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Get Started
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="mx-auto flex max-w-7xl items-center justify-between px-6 py-24">

        <div className="max-w-2xl">

          <h1 className="text-6xl font-extrabold leading-tight">

            Become

            <span className="text-blue-600">
              {" "}1% Better
            </span>

            <br />

            Every Day.

          </h1>

          <p className="mt-8 text-xl text-slate-600">

            Build habits.

            Stay disciplined.

            Track your journey.

          </p>

          <div className="mt-10 flex gap-4">

            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-8 py-4 text-white transition hover:bg-blue-700"
            >
              Start Free
            </Link>

            <Link
              to="/login"
              className="rounded-xl border px-8 py-4"
            >
              Login
            </Link>

          </div>

        </div>

        <div className="w-[420px] rounded-3xl bg-white p-8 shadow-2xl">

          <h2 className="mb-6 text-2xl font-bold">

            Today's Progress

          </h2>

          <div className="mb-6 h-4 rounded-full bg-gray-200">

            <div className="h-full w-4/5 rounded-full bg-blue-600" />

          </div>

          <div className="space-y-5">

            <div>

              <div className="mb-2 flex justify-between">

                <span>Workout</span>

                <span>45/60</span>

              </div>

              <div className="h-2 rounded-full bg-gray-200">

                <div className="h-full w-3/4 rounded-full bg-green-500" />

              </div>

            </div>

            <div>

              <div className="mb-2 flex justify-between">

                <span>Reading</span>

                <span>18/20</span>

              </div>

              <div className="h-2 rounded-full bg-gray-200">

                <div className="h-full w-11/12 rounded-full bg-green-500" />

              </div>

            </div>

            <div>

              <div className="mb-2 flex justify-between">

                <span>Water</span>

                <span>2400/3000</span>

              </div>

              <div className="h-2 rounded-full bg-gray-200">

                <div className="h-full w-4/5 rounded-full bg-green-500" />

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}