import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from "@/api/profile"; // same file where student API lives

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 🔍 Fetch all students
export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });
};

// 🔍 Fetch a single student by ID
export const useStudent = (id: number) => {
  return useQuery({
    queryKey: ["students", id],
    queryFn: () => getStudent(id),
    enabled: !!id,
  });
};

// ➕ Create new student
export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createStudent"],
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"], exact: true });
    },
  });
};

// 📝 Update existing student
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateStudent"],
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"], exact: true });
    },
  });
};

//  Delete student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteStudent"],
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"], exact: true });
    },
  });
};
