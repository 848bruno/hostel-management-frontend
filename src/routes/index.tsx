import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import { ArrowRight, BookOpen, Globe, Heart, PenTool, Star, Users, Zap } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
    <section className="relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
    <div className="text-center">
      <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
        Manage Your Hostel,
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Seamlessly</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        HostelEase is the modern platform where hostel managers handle rooms, tenants, and payments with ease.
        Empower your hostel operations with a few clicks.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
        <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all">
          View Dashboard
        </button>
      </div>
    </div>
  </div>
</section>


<section className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
      <div>
        <div className="text-4xl font-bold text-blue-600 mb-2">1,200+</div>
        <div className="text-gray-600">Beds Managed</div>
      </div>
      <div>
        <div className="text-4xl font-bold text-blue-600 mb-2">300+</div>
        <div className="text-gray-600">Active Tenants</div>
      </div>
      <div>
        <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
        <div className="text-gray-600">Hostels Registered</div>
      </div>
      <div>
        <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
        <div className="text-gray-600">Payment Tracking Accuracy</div>
      </div>
    </div>
  </div>
</section>


{/* Features Section */}
<section id="features" className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        All-in-One Hostel Management Features
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Streamlined tools to help you assign rooms, track tenants, and manage finances effectively.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
        <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
          🛏️
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Room Assignment</h3>
        <p className="text-gray-600">
          Easily assign tenants to available rooms and beds. Track occupancy in real-time.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
        <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
          👤
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Tenant Profiles</h3>
        <p className="text-gray-600">
          Store and manage tenant information including documents and emergency contacts.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
        <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
          💳
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Automated Payments</h3>
        <p className="text-gray-600">
          Track rent and utility payments. Send reminders and generate receipts.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
        <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
          🛠️
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Maintenance Requests</h3>
        <p className="text-gray-600">
          Let tenants submit issues and track resolution progress directly from the portal.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
        <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
          🔐
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Logs</h3>
        <p className="text-gray-600">
          Maintain logs of visitors, check-ins, and gate pass issuance for improved security.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
        <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
          📊
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Analytics Dashboard</h3>
        <p className="text-gray-600">
          Visualize occupancy, revenue, and tenant satisfaction to drive improvements.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Testimonials Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Trusted by Hostel Managers
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        “HostelEase has completely streamlined our operations. It's efficient, intuitive, and our tenants love it too!”
      </p>
    </div>
  </div>
</section>

{/* CTA Section */}
<section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
  <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
      Ready to Transform Your Hostel?
    </h2>
    <p className="text-xl text-blue-100 mb-8">
      Join hostels across the country simplifying operations and improving tenant experience. Start today.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-all transform hover:scale-105">
        Try for Free
      </button>
      <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-all">
        View Demo
      </button>
    </div>
  </div>
</section>

{/* Footer Brand Update */}
<footer className="bg-gray-900 text-white py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center mb-4">
      <PenTool className="h-8 w-8 text-blue-400" />
      <span className="ml-2 text-xl font-bold">HostelEase</span>
    </div>
    <p className="text-gray-400 max-w-md">
      The complete hostel management system for assigning rooms, managing tenants, and tracking payments.
    </p>
  </div>
</footer>
</div>
  )
}
