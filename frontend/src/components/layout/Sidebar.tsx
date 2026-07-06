import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 text-2xl font-bold">
        KarmYog
      </div>

      <nav className="flex flex-col">

        <NavLink
          to="/"
          className="px-6 py-3 hover:bg-gray-100"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/habits"
          className="px-6 py-3 hover:bg-gray-100"
        >
          Habits
        </NavLink>

        <NavLink
          to="/analytics"
          className="px-6 py-3 hover:bg-gray-100"
        >
          Analytics
        </NavLink>

        <NavLink
          to="/settings"
          className="px-6 py-3 hover:bg-gray-100"
        >
          Settings
        </NavLink>

      </nav>
    </aside>
  );
}