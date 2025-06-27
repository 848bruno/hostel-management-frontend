import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';zod
import { zodResolver } from '@hookform/resolvers/';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import type { Student } from './profiles/interface';


const schema = z.object({
  room_id: z.number({ required_error: 'Room ID is required' }),
  course_id: z.number({ required_error: 'Course ID is required' }),
});

type FormData = z.infer<typeof schema>;

interface EditStudentModalProps {
  student: Student;
  onClose: () => void;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ student, onClose }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      room_id: student.room_id,
      course_id: student.course_id,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.patch(`/students/${student.id}`, data);
      toast.success('Student updated successfully');
      queryClient.invalidateQueries({ queryKey: ['students'] });
      onClose();
    } catch (error: any) {
      toast.error(`Failed to update student: ${error.message}`);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto z-50">
        <Dialog.Title className="text-xl font-semibold flex justify-between items-center mb-4">
          Edit Student
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </Dialog.Title>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="room_id" className="block text-sm font-medium text-gray-700">Room ID</label>
            <input
              type="number"
              id="room_id"
              {...register('room_id', { valueAsNumber: true })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.room_id && <p className="text-red-600 text-sm mt-1">{errors.room_id.message}</p>}
          </div>

          <div>
            <label htmlFor="course_id" className="block text-sm font-medium text-gray-700">Course ID</label>
            <input
              type="number"
              id="course_id"
              {...register('course_id', { valueAsNumber: true })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.course_id && <p className="text-red-600 text-sm mt-1">{errors.course_id.message}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default EditStudentModal;
