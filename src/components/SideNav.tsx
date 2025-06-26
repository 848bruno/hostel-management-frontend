// src/components/Sidebar.tsx
import { Link } from '@tanstack/react-router';
import { Home, User, LayoutDashboard, LogOut, UserPen, Users, HomeIcon, MessageCircleMore, MessageCircleWarningIcon, School } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-blue-500 text-white flex flex-col">
      <div className="px-6 py-4 text-2xl bg-blue-600 font-bold border-b border-white">
        Dashboard
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link
          to="/dashboard/profile"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <UserPen className="w-5 h-5" />
          Profile
        </Link>
        <Link
          to="/dashboard/admins"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <User className="w-5 h-5" />
          Admins
        </Link>
        <Link
          to="/dashboard/users"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <Users className="w-5 h-5" />
          Users
        </Link>
        <Link
          to="/dashboard/rooms"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <HomeIcon className="w-5 h-5" />
          Rooms
        </Link>
        <Link
          to="/dashboard/feedbacks"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <MessageCircleMore className="w-5 h-5" />
          Feedbacks
        </Link>
        <Link
          to="/dashboard/complaints"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <MessageCircleWarningIcon className="w-5 h-5" />
          Complaints
        </Link>
        <Link
          to="/dashboard/courses"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <School className="w-5 h-5" />
          Courses
        </Link>
      </nav>
      <div className="px-4 py-4 border-t border-white">
        <Link
          to="/logout"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
