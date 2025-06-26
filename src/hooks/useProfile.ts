import { createProfile, deleteProfile, getProfile, getProfiles, updateProfile } from "@/api/profile";
import type { Profile } from "@/components/profiles/interface";
import { useMutation, useQuery, useQueryClient, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";

export const useProfiles = () => {
    return useQuery({
        queryKey: ["profiles"],
        queryFn: getProfiles,
    })
};

export const useProfile = (id:number) => {
    return useQuery({
        queryKey: ["profiles", id],
        queryFn: () => getProfile(id),
        enabled: !!id,
});

}

export const useCreateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['createProfiles'],
        mutationFn: createProfile, // from the api
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey:['profiles'],exact:true})
        }
    })
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

     return useMutation({
        mutationKey:['updateProfile'],
        mutationFn: updateProfile,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey:['profiles'],exact:true})
        }
    })
}

export const useDeleteProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['deleteProfile'],
        mutationFn: deleteProfile,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey:['profiles'],exact:true})
        }
    })
}