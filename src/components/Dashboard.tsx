import Sidebar from '@/components/SideNav'
import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'


export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {


  return (
    <div className="flex h-screen bg-gray-200 text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      
      </main>
    </div>
  )
}

export default Dashboard