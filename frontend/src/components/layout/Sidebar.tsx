import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { logout } from "../../services/auth.service";



interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const navigate = useNavigate();

const logoutMutation = useMutation({
  mutationFn: logout,

  onSuccess: () => {
    navigate("/");
  },
});
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
      <button
  onClick={() => logoutMutation.mutate()}
  className="mt-auto flex w-full items-center gap-3 border-t border-gray-200 px-6 py-4 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
>
  <LogOut size={18} />
  Logout
</button>
    </aside>
  );
}