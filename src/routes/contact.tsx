import { createFileRoute } from '@tanstack/react-router'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: contact,
})

function contact() {
  return (
    <div className="min-h-screen bg-gray-200 text-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">We’re Here to Help</h1>
        <p className="text-lg text-gray-700">
          Whether you have a question, need support, or just want to share feedback — we’re always ready to listen.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Mail className="w-8 h-8 mb-2 text-gray-700" />
          <h2 className="font-semibold text-gray-800">Email</h2>
          <p className="text-gray-600 text-sm">support@hostelease.com</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <Phone className="w-8 h-8 mb-2 text-gray-700" />
          <h2 className="font-semibold text-gray-800">Phone</h2>
          <p className="text-gray-600 text-sm">+254 712 345 678</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <MapPin className="w-8 h-8 mb-2 text-gray-700" />
          <h2 className="font-semibold text-gray-800">Office</h2>
          <p className="text-gray-600 text-sm">Kirinyaga University, IT Department</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <MessageCircle className="w-6 h-6" /> Send Us a Message
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="jane@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows={4}
              placeholder="Write your message here..."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-12 text-center text-gray-600">
        We aim to respond within 24 hours on business days.
      </div>
    </div>
  )
}
