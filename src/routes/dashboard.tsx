import Sidebar from '@/components/SideNav'
import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { useProfiles } from "@/hooks/useProfile";
import { BarChart } from '@mui/x-charts';
import { HomeIcon, MessageCircleMore, MessageCircleWarning, School, User, UserPen, Users } from 'lucide-react';


export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { data: profiles } = useProfiles();

  return (
    <div className="flex h-screen">
      {/* Sidebar stays fixed width */}
      <Sidebar />

      {/* Main content takes remaining space */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <Outlet />
        <h2 className="text-xl font-bold mb-4 text-gray-800">Dashboard</h2>
        <div className='flex flex-wrap mb-3 justify-between'>
        <div className="bg-white rounded-xl shadow-md mb-8 p-4 w-60 h-40 flex flex-col justify-between">
      <div className="text-3xl font-semibold text-blue-600">
        <div className='flex items-center justify-center'> <UserPen className="w-10 h-10" />Profiles </div>
         <div  className="text-center text-6xl font-bold mt-1">
         {profiles?.length || 0}
         </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-md p-4 w-60 h-40 flex flex-col justify-between">
      <div className="text-3xl font-semibold text-blue-600">
        <div className='flex items-center justify-center'> <User className="w-10 h-10" />Admins </div>
         <div  className="text-center text-6xl font-bold mt-1">
         {profiles?.length || 0}
         </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-md p-4 w-60 h-40 flex flex-col justify-between">
      <div className="text-3xl font-semibold text-blue-600">
        <div className='flex items-center justify-center'> <Users className="w-10 h-10" />Users </div>
         <div  className="text-center text-6xl font-bold mt-1">
         {profiles?.length || 0}
         </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-md p-4 w-60 h-40 flex flex-col justify-between">
      <div className="text-3xl font-semibold text-blue-600">
        <div className='flex items-center justify-center'> <MessageCircleWarning className="w-10 h-10" />Complaints </div>
         <div  className="text-center text-6xl font-bold mt-1">
         {profiles?.length || 0}
         </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-md p-4 w-60 h-40 flex flex-col justify-between">
      <div className="text-3xl font-semibold text-blue-600">
        <div className='flex items-center justify-center'> <MessageCircleMore className="w-10 h-10" />Feedbacks </div>
         <div  className="text-center text-6xl font-bold mt-1">
         {profiles?.length || 0}
         </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-md p-4 w-60 h-40 flex flex-col justify-between">
      <div className="text-3xl font-semibold text-blue-600">
        <div className='flex items-center justify-center'> <HomeIcon className="w-10 h-10" />Rooms </div>
         <div  className="text-center text-6xl font-bold mt-1">
         {profiles?.length || 0}
         </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-md p-4  mb-8 w-60 h-40 flex flex-col justify-between">
      <div className="text-3xl font-semibold text-blue-600">
        <div className='flex items-center justify-center'> <School className="w-10 h-10" />Courses </div>
         <div  className="text-center text-6xl font-bold mt-1">
         {profiles?.length || 0}
         </div>
      </div>
    </div>
    </div>
     <BarChart series={[
      { data: [35, 44, 24, 34] },
      { data: [51, 6, 49, 30] },
      { data: [15, 25, 30, 50] },
      { data: [60, 50, 15, 25] },
      
    ]}
    height={290}
    xAxis={[{ data: ['Profiles', 'Admins', 'Users','Courses',] }]}/>
      </main>
    </div>
  )
}
