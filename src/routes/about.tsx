import { createFileRoute } from '@tanstack/react-router'
import { HeartHandshake, Users, MessageCircleWarning, ShieldCheck } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: about,
})

function about() {
  return (
    <div className="min-h-screen bg-gray-200 text-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">About Our Platform</h1>
        <p className="text-lg text-gray-700 mb-8">
          HostelEase was built with one mission in mind — to give every student a voice and every hostel a way to listen.
          We believe that every concern matters, and every feedback is a step toward better living and learning conditions.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center space-x-4 mb-4 text-gray-700">
            <MessageCircleWarning className="h-8 w-8 text-gray-700" />
            <h2 className="text-xl font-semibold">Raise Complaints with Ease</h2>
          </div>
          <p className="text-gray-600">
            Students can report room issues, maintenance requests, or any hostel-related concerns anonymously or openly.
            No voice goes unheard.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center space-x-4 mb-4 text-gray-700">
            <HeartHandshake className="h-8 w-8 text-gray-700" />
            <h2 className="text-xl font-semibold">Empathetic Resolution</h2>
          </div>
          <p className="text-gray-600">
            Administrators are notified immediately and empowered with tools to resolve complaints with transparency and care.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center space-x-4 mb-4 text-gray-700">
            <ShieldCheck className="h-8 w-8 text-gray-700" />
            <h2 className="text-xl font-semibold">Secure & Confidential</h2>
          </div>
          <p className="text-gray-600">
            Every complaint is protected and handled with confidentiality. We ensure that students feel safe speaking up.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center space-x-4 mb-4 text-gray-700">
            <Users className="h-8 w-8 text-gray-700" />
            <h2 className="text-xl font-semibold">Built for Community</h2>
          </div>
          <p className="text-gray-600">
            This platform connects students, administrators, and caretakers into a shared mission — creating a better hostel experience for everyone.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-700 text-lg">
          🌱 Together, we’re making hostels more human. Safer. Kinder. Smarter.
        </p>
      </div>
    </div>
  )
}
