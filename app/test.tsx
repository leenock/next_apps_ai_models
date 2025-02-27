"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Home, Settings, User, FileText } from "lucide-react";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Sidebar default closed on mobile

  return (
    <div className="flex h-screen">
      {/* Sidebar Overlay (for mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:relative`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="mt-4 space-y-4 px-4">
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <Home size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              className="flex items-center gap-3 hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <User size={20} />
              Users
            </Link>
          </li>
          <li>
            <Link
              href="/reports"
              className="flex items-center gap-3 hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <FileText size={20} />
              Reports
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex items-center gap-3 hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <Settings size={20} />
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
        {/* Top Navbar */}
        <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-md z-50">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="hidden md:block">👤 Profile</div>
        </nav>

        {/* Page Content */}
        <div className="flex-1 p-6 mt-16 md:ml-6">
          <div className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold">Welcome to the Admin Panel</h2>
            <p className="mt-2 text-gray-600">Manage your data from the sidebar.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
