import { Link } from '@tanstack/react-router'
import { Home } from 'lucide-react'

export default function Header() {
  return (
    <header className="relative flex items-center justify-between p-4 bg-white text-black  shadow-md sticky top-0 z-50">
  {/* Left - BlogSpace Logo */}
  <div className="flex items-center">
    <Link className="flex items-center text-1xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
      <Home className="h-8 w-8 text-blue-600" />
      Hostel Managment System
    </Link>
  </div>
  {/* Center - Navigation */}
  <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-5">
    <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Home</Link>
    <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Dashboard</Link>
    <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">About</Link>
    <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Contact</Link>  
    <Link to="/signup" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Sign Up</Link>

        {/* <div className="px-2 font-bold">
          <Link to="/demo/form/address">Address Form</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/tanstack-query">TanStack Query</Link>
        </div> */}
      </nav>
    </header>
  )
}
