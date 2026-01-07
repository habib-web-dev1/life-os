"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Target, CheckSquare, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { showConfirm } from "@/lib/sweetAlert";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Habits", href: "/habits", icon: CheckSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    const result = await showConfirm(
      "Sign Out",
      "Are you sure you want to sign out?"
    );

    if (result.isConfirmed) {
      signOut();
    }
  };

  return (
    <div className="h-full border-r border-slate-100 bg-white flex flex-col p-6">
      <div className="flex items-center gap-3 font-bold text-xl mb-10 px-2">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs shadow-lg">
          L
        </div>
        LifeOS
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon
                size={20}
                className={`transition-transform group-hover:scale-110 ${
                  isActive ? "text-white" : ""
                }`}
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-slate-50">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-2xl transition-all font-medium group"
        >
          <LogOut
            size={20}
            className="transition-transform group-hover:scale-110"
          />
          Sign Out
        </button>
      </div>
    </div>
  );
}
