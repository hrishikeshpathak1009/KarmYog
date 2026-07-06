export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">

        <span>
          Hrishikesh
        </span>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white">
          H
        </div>

      </div>
    </header>
  );
}