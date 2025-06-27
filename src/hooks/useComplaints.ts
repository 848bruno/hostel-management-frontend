// src/hooks/useComplain.ts

import {
  getComplains,
  getComplain,
  createComplain,
  updateComplain,
  deleteComplain,
} from "@/api/profile"; // assuming all complain API functions exist in profile.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 🔍 Get all complains
export const useComplains = () => {
  return useQuery({
    queryKey: ["complains"],
    queryFn: getComplains,
  });
};

// 🔍 Get a single complain by ID
export const useComplain = (id: number) => {
  return useQuery({
    queryKey: ["complains", id],
    queryFn: () => getComplain(id),
    enabled: !!id,
  });
};

// ➕ Create new complain
export const useCreateComplain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createComplain"],
    mutationFn: createComplain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complains"], exact: true });
    },
  });
};

// 📝 Update existing complain
export const useUpdateComplain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateComplain"],
    mutationFn: updateComplain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complains"], exact: true });
    },
  });
};

// Delete complain
export const useDeleteComplain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteComplain"],
    mutationFn: deleteComplain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complains"], exact: true });
    },
  });
};
