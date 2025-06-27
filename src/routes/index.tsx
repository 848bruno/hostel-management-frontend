import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, PenTool } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="bg-gray-200 text-black">
      {/* Hero */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            Student Complain Management,
            <span className="block text-gray-700">Simplified & Centralized</span>
          </h1>
          <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
            HostelEase enables admins to manage student complaints efficiently with a clean and responsive dashboard.
            Say goodbye to lost reports and delayed resolutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard/complaints" className="bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition-all">
              Manage Complains
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
            <Link to="/dashboard/students" className="border-2 border-gray-700 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-700 hover:text-white transition-all">
              View Students
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tools for Every Step of the Complain Process
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              From submission to resolution, HostelEase gives admins everything they need to resolve student issues fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Complaint Submission</h3>
              <p className="text-gray-700">
                Students can submit complaints easily with timestamps and categories for organized tracking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Admin Resolution Panel</h3>
              <p className="text-gray-700">
                Admins can view, filter, and update the status of every complaint directly from the dashboard.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Feedback and Follow-up</h3>
              <p className="text-gray-700">
                Allow students to give feedback after a complaint is handled. Keep improving your service quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-300">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Take Control of Student Complaints Today
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Start using HostelEase to track and resolve student issues before they escalate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard/complaints" className="bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition">
              Launch Complaint Dashboard
            </Link>
            <Link to="/dashboard/admins" className="border-2 border-gray-700 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-700 hover:text-white transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-4">
            <PenTool className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-xl font-bold">HostelEase</span>
          </div>
          <p className="text-gray-400 max-w-md">
            Built for hostel admins who care about student satisfaction. Resolve issues. Keep records. Improve lives.
          </p>
        </div>
      </footer>
    </div>
  )
}
