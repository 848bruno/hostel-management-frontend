import {
  getFeedbacks,
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "@/api/profile"; // assuming all feedback API functions exist in profile.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 🔍 Get all feedbacks
export const useFeedbacks = () => {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: getFeedbacks,
  });
};

// 🔍 Get a single feedback by ID
export const useFeedback = (id: number) => {
  return useQuery({
    queryKey: ["feedbacks", id],
    queryFn: () => getFeedback(id),
    enabled: !!id,
  });
};

// ➕ Create new feedback
export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createFeedback"],
    mutationFn: createFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"], exact: true });
    },
  });
};

// 📝 Update existing feedback
export const useUpdateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateFeedback"],
    mutationFn: updateFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"], exact: true });
    },
  });
};

//  Delete feedback
export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteFeedback"],
    mutationFn: deleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"], exact: true });
    },
  });
};
