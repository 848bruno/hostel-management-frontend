import React, { useState, useEffect } from 'react';
import type { Admin } from '@/components/profiles/interface';
import { Dialog } from '@headlessui/react';
import { toast } from 'sonner';
import axios from 'axios';

interface EditAdminModalProps {
  admin: Admin;
  onClose: () => void;
}

export default function EditAdminModal({ admin, onClose }: EditAdminModalProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'student' | 'guest'>('admin');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (admin?.profile) {
      setUserId(admin.profile.id);
      setEmail(admin.profile.email);
      setRole(admin.profile.role);
    } else {
      setUserId(null);
    }
  }, [admin]);

  const handleUpdate = async () => {
    if (!userId) {
      toast.error('Admin profile ID is missing.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.patch(`/admins/${admin.id}`, {
        profile: {
          id: userId,
          email,
          role,
        },
      });

      toast.success('Admin updated successfully');
      onClose();
    } catch (error: any) {
      toast.error(`Failed to update admin: ${error?.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl text-black">
          <Dialog.Title className="text-xl font-semibold mb-4">Edit Admin</Dialog.Title>

          {userId !== null ? (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">User ID</label>
                  <input
                    type="text"
                    value={userId}
                    disabled
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'admin' | 'student' | 'guest')}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                    <option value="guest">Guest</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </div>
            </>
          ) : (
            <div className="text-red-600">
              Unable to load admin profile data. Please refresh and try again.
              <div className="mt-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
