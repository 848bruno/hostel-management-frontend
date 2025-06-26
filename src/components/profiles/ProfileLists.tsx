import Loaders from '@/constatnts/Loader'
import { useProfiles } from '@/hooks/useProfile'
import React from 'react'
import { toast } from 'sonner'
import type { Profile } from './interface'
import { SquarePen, Trash2 } from 'lucide-react'

function ProfileLists() {

  const {data,isError,error,isLoading,isSuccess} = useProfiles()

  if(isError && error){
    toast.error(`Failed to load profiles:${error.message}`)
  }
  return (
    <div className="bg-white shadow-md rounded-lg min-w-auto">
      <h3 className="text-2xl text-blue-400 m-2">ProfileLists</h3>
    {isLoading && <Loaders/>}
    {isSuccess && (
      <ul className="min-w-full grid grid-cols-3 gap-4">
        {profiles?.map((profile: Profile) => (
            <li
              className="mb-4 p-2 border rounded min-w-auto bg-gray-50 hover:bg-gray-100 transition-colors"
              key={profile.id}>
              <h4 className="font-semibold">{profile.firstName} {profile.lastName}</h4>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
              <p>Created At: {new Date(profile.createdAt).toLocaleDateString()}</p>
              <p>Updated At: {new Date(profile.updatedAt).toLocaleDateString()}</p>
              {profile.student && (
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <h5 className="font-medium">Student Details:</h5>
                  <p>Enrollment Date: {new Date(profile.student.enrollmentDate).toLocaleDateString()}</p>
                  <p>Degree Program: {profile.student.degreeProgram}</p>
                  <p>GPA: {profile.student.gpa}</p>
                </div>
              )}
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
                  onClick={() => handleDelete(profile.id)}
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
    )
      
    }
    </div>
  )
}

export default ProfileLists