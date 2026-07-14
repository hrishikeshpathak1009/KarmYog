import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const quotes = [
  {
    text: "राम काजु कीन्हें बिनु मोहि कहाँ बिश्राम॥",
    meaning:
      "Without completing Shri Ram's work, how can I take rest?",
    source: "Ramcharitmanas • Sundarkand",
  },
  {
    text:
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन॥",
    meaning:
      "You have a right to action, never to its fruits.",
    source: "Bhagavad Gita 2.47",
  },
  {
    text:
      "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्॥",
    meaning:
      "Lift yourself by yourself. Never degrade yourself.",
    source: "Bhagavad Gita 6.5",
  },
  {
    text:
      "Arise, Awake and Stop Not Till The Goal Is Reached.",
    meaning:
      "Consistency triumphs over comfort.",
    source: "Swami Vivekananda",
  },
  {
    text:
      "Dream is not what you see in sleep. Dream is something that doesn't let you sleep.",
    meaning:
      "Great achievements begin with disciplined action.",
    source: "Dr. A.P.J. Abdul Kalam",
  },
  {
    text:
      "Detach from outcome , attach with the process",
    meaning:
      "Don't focus on outcome , but on Karm.",
    source: "HRISHIKESH PATHAK",
  },
  {
    text:
      "Be obsessed - but with your karm , not with its outcome ",
    meaning:
      "Give your Everything for your duties , but don't expect anything as its fruit.",
    source: "HRISHIKESH PATHAK",
  },
];

export default function QuotesSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-orange-50 py-28">

      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2 className="text-5xl font-bold">
          Inspired by Timeless Wisdom
        </h2>

        <p className="mt-6 text-lg text-gray-600">
          KarmYog isn't just about productivity.
          It's about cultivating discipline through
          meaningful action.
        </p>

        <div className="mt-20 rounded-3xl bg-white p-12 shadow-xl transition-all duration-700">

          <p className="text-3xl leading-relaxed font-semibold text-orange-900">

            {quotes[index].text}

          </p>

          <p className="mt-8 text-xl italic text-gray-600">

            {quotes[index].meaning}

          </p>

          <p className="mt-8 text-sm uppercase tracking-widest text-gray-400">

            {quotes[index].source}

          </p>

        </div>

        <div className="mt-20">

          <h3 className="text-4xl font-bold">

            Begin Your Journey Today

          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">

            Your future is built by today's actions.

            Build discipline.

            Build consistency.

            Build yourself.

          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-8 py-4 text-lg text-white transition hover:bg-blue-700"
            >
              Begin Your Karm
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-gray-300 px-8 py-4 text-lg hover:bg-gray-100"
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}