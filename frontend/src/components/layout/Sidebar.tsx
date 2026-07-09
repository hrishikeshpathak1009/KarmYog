import { NavLink } from "react-router-dom";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  return (
    <aside
      className={`
        fixed
        lg:static
        top-0
        left-0
        z-40
        h-full
        w-45
        bg-white
        border-r
        transform
        transition-transform
        duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
    >
      <div className="p-6 text-2xl font-bold">
        KarmYog
      </div>

      <nav className="flex flex-col">

        <NavLink
          to="/dashboard"
          onClick={() => setSidebarOpen(false)}
          className="px-6 py-3 hover:bg-gray-100"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/habits"
          onClick={() => setSidebarOpen(false)}
          className="px-6 py-3 hover:bg-gray-100"
        >
          My Karm
        </NavLink>

        <NavLink
          to="/analytics"
          onClick={() => setSidebarOpen(false)}
          className="px-6 py-3 hover:bg-gray-100"
        >
          Analytics
        </NavLink>

        <NavLink
          to="/settings"
          onClick={() => setSidebarOpen(false)}
          className="px-6 py-3 hover:bg-gray-100"
        >
          Settings
        </NavLink>

      </nav>
    </aside>
  );
}