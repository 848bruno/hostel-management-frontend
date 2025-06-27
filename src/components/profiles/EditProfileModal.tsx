import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";

import type { Profile } from "./interface";
import { MdClose } from "react-icons/md";
import { useUpdateProfile } from "@/hooks/useProfile";

const formSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  role: z.enum(['student', 'admin', 'guest'], {
    errorMap: () => ({
      message: 'Role must be one of: student, admin, or guest',
    }),
  }),
});

const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message || 'Validation error';
};

interface EditProfileModalProps {
  profile: Profile;
  onClose: () => void;
}

function EditProfileModal({ profile, onClose }: EditProfileModalProps) {
  const updateMutation = useUpdateProfile();

  const form = useForm({
    defaultValues: {
      username: profile.username,
      email: profile.email,
      role: profile.role,
    },
    onSubmit: async ({ value }) => {
      const result = formSchema.safeParse(value);
      if (!result.success) {
        toast.error('Please fix validation errors before submitting');
        return;
      }

      try {
        await updateMutation.mutateAsync({
          id: profile.id.toString(),
          ...result.data,
        });
        toast.success('Profile updated successfully!');
        onClose();
      } catch (error) {
        toast.error('Failed to update profile. Please try again.');
        console.error(error);
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            <MdClose />
          </button>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }} className="space-y-4">

          {/* Username */}
          <form.Field name="username" validators={{
            onChange: ({ value }) => validateField(value, formSchema.shape.username),
            onBlur: ({ value }) => validateField(value, formSchema.shape.username),
          }}>
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as "student" | "admin" | "guest")}
                  onBlur={field.handleBlur}
                  className={`w-full px-3 py-2 border rounded-md ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter username"
                />
                {field.state.meta.errors[0] && (
                  <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Email */}
          <form.Field name="email" validators={{
            onChange: ({ value }) => validateField(value, formSchema.shape.email),
            onBlur: ({ value }) => validateField(value, formSchema.shape.email),
          }}>
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as "student" | "admin" | "guest")}
                  onBlur={field.handleBlur}
                  className={`w-full px-3 py-2 border rounded-md ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter email"
                />
                {field.state.meta.errors[0] && (
                  <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Role */}
          <form.Field name="role" validators={{
            onChange: ({ value }) => validateField(value, formSchema.shape.role),
            onBlur: ({ value }) => validateField(value, formSchema.shape.role),
          }}>
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as "student" | "admin" | "guest")}
                  onBlur={field.handleBlur}
                  className={`w-full px-3 py-2 border rounded-md ${field.state.meta.errors.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="guest">Guest</option>
                </select>
                {field.state.meta.errors[0] && (
                  <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Buttons */}
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || updateMutation.isPending}
                  className={`flex-1 py-2 px-4 rounded-md font-medium ${canSubmit && !isSubmitting ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                >
                  {isSubmitting || updateMutation.isPending ? 'Updating...' : 'Update Profile'}
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

        {updateMutation.isError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            Error updating profile: {updateMutation.error?.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProfileModal;
