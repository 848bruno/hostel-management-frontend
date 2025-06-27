// src/components/Sidebar.tsx
import { Link } from '@tanstack/react-router';
import { Home, User, LayoutDashboard, LogOut, UserPen, Users, HomeIcon, MessageCircleMore, MessageCircleWarningIcon, School } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="px-6 py-4 text-2xl bg-gray-800 font-bold border-b border-white">
        Dashboard
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
        <Link
          to="/dashboard/"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link
          to="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <UserPen className="w-5 h-5" />
          Profile
        </Link>
        <Link
          to="/dashboard/admins"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <User className="w-5 h-5" />
          Admins
        </Link>
        <Link
          to="/dashboard/students"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <Users className="w-5 h-5" />
          Students
        </Link>
       
        <Link
          to="/dashboard/feedbacks"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <MessageCircleMore className="w-5 h-5" />
          Feedbacks
        </Link>
        <Link
          to="/dashboard/complaints"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <MessageCircleWarningIcon className="w-5 h-5" />
          Complaints
        </Link>
       
      </nav>
      <div className="px-4 py-4 border-t border-white">
        <Link
          to="/logout"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
