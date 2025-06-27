import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { MdClose } from 'react-icons/md';
import type { Complain, Student } from './profiles/interface';
import { useUpdateComplain } from '@/hooks/useComplaints';

const formSchema = z.object({
  complain: z
    .string()
    .min(5, 'Complaint must be at least 5 characters')
    .max(500, 'Complaint must be at most 500 characters'),
  status: z.enum(['pending', 'resolved', 'in progress']),
});

const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message || 'Validation error';
};

interface EditComplainModalProps {
  complain: Complain;
  student: Student;
  onClose: () => void;
}

export default function EditComplainModal({ complain, onClose }: EditComplainModalProps) {
  const updateMutation = useUpdateComplain();

  const form = useForm({
    defaultValues: {
      complain: complain.complain,
      status: complain.status,
    },
    onSubmit: async ({ value }) => {
      const result = formSchema.safeParse(value);
      if (!result.success) {
        toast.error('Please fix validation errors before submitting');
        return;
      }

      try {
        await updateMutation.mutateAsync({
          complainid: complain.complainid,
          ...result.data,
          id: 0,
        });
        toast.success('Complaint updated successfully!');
        onClose();
      } catch (error) {
        toast.error('Failed to update complaint. Please try again.');
        console.error(error);
      }
    },
  });

  return (
    <div className="fixed top-10 right-10 z-50 bg-white rounded-lg  shadow-lg border border-gray-300 w-full  max-w-md p-6 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Edit Complaint</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
          <MdClose />
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Complain Text Field */}
        <form.Field
          name="complain"
          validators={{
            onChange: ({ value }) => validateField(value, formSchema.shape.complain),
            onBlur: ({ value }) => validateField(value, formSchema.shape.complain),
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complain</label>
              <textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className={`w-full px-3 py-2 border rounded-md resize-none h-28 ${
                  field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe your issue here..."
              />
              {field.state.meta.errors[0] && (
                <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Status Select */}
        <form.Field
          name="status"
          validators={{
            onChange: ({ value }) => validateField(value, formSchema.shape.status),
            onBlur: ({ value }) => validateField(value, formSchema.shape.status),
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className={`w-full px-3 py-2 border rounded-md ${
                  field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              {field.state.meta.errors[0] && (
                <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </form.Field>

        {/* Submit & Cancel Buttons */}
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting || updateMutation.isPending}
                className={`flex-1 py-2 px-4 rounded-md font-medium ${
                  canSubmit && !isSubmitting
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isSubmitting || updateMutation.isPending ? 'Updating...' : 'Update Complaint'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-4 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </form.Subscribe>
      </form>

      {/* Mutation Error */}
      {updateMutation.isError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {updateMutation.error?.message}
        </div>
      )}
    </div>
  );
}
