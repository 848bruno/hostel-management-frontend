import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
} from "@/api/profile";
import type { Admin } from "@/components/profiles/interface";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";

// Fetch all admins
export const useAdmins = (): UseQueryResult<Admin[], Error> => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
  });
};

// Fetch a single admin by ID
export const useAdmin = (id: number): UseQueryResult<Admin, Error> => {
  return useQuery({
    queryKey: ["admins", id],
    queryFn: () => getAdmin(id),
    enabled: !!id,
  });
};

// Create a new admin
export const useCreateAdmin = (): UseMutationResult<
  Admin,
  Error,
  Partial<Admin>
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createAdmin"],
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"], exact: true });
    },
  });
};

// Update an admin
export const useUpdateAdmin = (): UseMutationResult<
  Admin,
  Error,
  Partial<Admin>
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateAdmin"],
    mutationFn: updateAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"], exact: true });
    },
  });
};

// Delete an admin
export const useDeleteAdmin = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteAdmin"],
    mutationFn: deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"], exact: true });
    },
  });
};
