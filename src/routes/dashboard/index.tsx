import { createFileRoute } from '@tanstack/react-router'
import { useProfiles } from '@/hooks/useProfile'


import { BarChart } from '@mui/x-charts'
import {
  MessageCircleMore,
  MessageCircleWarning,
  User,
  UserPen,
  Users,
} from 'lucide-react'
import { useFeedbacks } from '@/hooks/useFedbacks'
import { useComplains } from '@/hooks/useComplaints'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
      const { data: profiles = [] } = useProfiles()
      const { data: complaints = [] } = useComplains()
      const { data: feedbacks = [] } = useFeedbacks()
    
      const adminCount = profiles.filter(p => p.role === 'admin').length
      const studentCount = profiles.filter(p => p.role === 'student').length
    
      const cards = [
        { icon: <UserPen className="w-8 h-8" />, label: 'Profiles', value: profiles.length },
        { icon: <User className="w-8 h-8" />, label: 'Admins', value: adminCount },
        { icon: <Users className="w-8 h-8" />, label: 'Students', value: studentCount },
        { icon: <MessageCircleWarning className="w-8 h-8" />, label: 'Complaints', value: complaints.length },
        { icon: <MessageCircleMore className="w-8 h-8" />, label: 'Feedbacks', value: feedbacks.length },
      ]
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>

        {/* Stat Cards */}
        <div className="flex flex-wrap gap-4 mb-10">
          {cards.map(({ icon, label, value }, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 w-60 h-40 flex flex-col justify-between"
            >
              <div className="flex items-center justify-center text-gray-700 font-semibold text-lg">
                <div className="flex items-center gap-2">
                  {icon} {label}
                </div>
              </div>
              <div className="text-center text-5xl font-bold text-gray-900">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Entity Distribution
          </h3>
          <BarChart
            series={[
              { data: [profiles.length], label: 'Profiles' },
              { data: [adminCount], label: 'Admins' },
              { data: [studentCount], label: 'Students' },
              { data: [complaints.length], label: 'Complaints' },
              { data: [feedbacks.length], label: 'Feedbacks' },
            ]}
            height={290}
            xAxis={[{ data: ['All'], scaleType: 'band' }]}
          />
        </div>
    </>
  )
}
