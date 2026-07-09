import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Navbar({ setSidebarOpen }: NavbarProps) {
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/habits": "My Karm",
    "/analytics": "Analytics",
    "/settings": "Settings",
  };

  const title = pageTitles[location.pathname] ?? "KarmYog";

  return (
    <header className="flex h-13 items-center justify-between border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden sm:block">Built by Hrishikesh Pathak</span>

        
      </div>
    </header>
  );
}