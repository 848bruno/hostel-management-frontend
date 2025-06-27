import Loaders from '@/constatnts/Loader'
import { useProfiles } from '@/hooks/useProfile'
import React from 'react'
import { toast } from 'sonner'
import type { Profile } from './interface'
import { SquarePen, Trash2 } from 'lucide-react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/utils/api'

function ProfileLists() {
  const { data, isError, error, isLoading, isSuccess } = useProfiles()
  const queryClient = useQueryClient()

  // Example deleteProfile function, replace with your actual API call
  async function deleteProfile(id: string) {
    await api.delete(`/profile/${id}`);
    // Simulate API call
    return Promise.resolve()
  }

  const deleteMutation = useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] })
      toast.success('Profile deleted successfully')
    },
    onError: (error: any) => {
      toast.error(`Failed to delete profile: ${error.message}`)
    },
  })

  if (isError && error) {
    toast.error(`Failed to load profiles:${error.message}`)
  }
  function handleEdit(_profile: Profile): void {
    throw new Error('Function not implemented.')
  }
  function handleDelete(id: string): void {
    deleteMutation.mutate(id)
  }

  return (
    <div className="bg-gray-200 shadow-md rounded-lg min-w-auto">
      <h3 className="text-2xl text-blue-400 m-2">ProfileLists</h3>
      {isLoading && <Loaders />}
      {isSuccess && (
        <ul className="min-w-full grid grid-cols-3 gap-4">
          {data?.map((profile: Profile) => (
            <li
              className="mb-4 p-2 border rounded min-w-auto bg-gray-50 hover:bg-gray-100 transition-colors"
              key={profile.id}
            >
              <h4 className="font-semibold">{profile.username}</h4>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
              <p>
                Created At: {new Date(profile.createdAt).toLocaleDateString()}
              </p>
              <p>
                Updated At: {profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'N/A'}
              </p>
              {profile.student ? profile.student.name ?? JSON.stringify(profile.student) : null}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(profile)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors flex items-center gap-1"
                  disabled={deleteMutation.isPending}
                >
                  <SquarePen />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(String(profile.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors flex items-center gap-1"
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 />
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProfileLists
