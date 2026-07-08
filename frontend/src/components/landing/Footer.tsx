export default function Footer() {
  return (
    <footer className="border-t bg-white py-10">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center md:flex-row">

        <div>

          <h2 className="text-2xl font-bold text-blue-600">
            KarmYog
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Inspired by the philosophy of Karma Yoga.
          </p>

        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} KarmYog ·
          Built by Hrishikesh Pathak
        </p>

      </div>

    </footer>
  );
}