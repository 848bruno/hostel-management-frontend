import { Link } from '@tanstack/react-router'
import { Home } from 'lucide-react'

export default function Header() {
  return (
    <header className=" flex items-center justify-between p-4 bg-gray-800 text-white  shadow-md sticky top-0 z-50">
  {/* Left - BlogSpace Logo */}
  <div className="flex items-center">
    <Link to="/"className="flex items-center text-1xl font-bold text-white hover:text-blue-700 transition-colors">
      <Home className="h-8 w-8 text-white" />
         Complaints Managment System
    </Link>
  </div>
  {/* Center - Navigation */}
  <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-5">
    <Link to="/" className="text-white hover:text-blue-700 font-medium transition-colors">Home</Link>
    <Link to="/dashboard" className="text-white hover:text-blue-700 font-medium transition-colors">Dashboard</Link>
    <Link to="/about" className="text-white hover:text-blue-700 font-medium transition-colors">About</Link>
    <Link to="/contact" className="text-white hover:text-blue-700 font-medium transition-colors">Contact</Link>
    <Link to="/signup" className="text-white hover:text-blue-700 font-medium transition-colors">Sign Up</Link>

      </nav>
    </header>
  )
}
