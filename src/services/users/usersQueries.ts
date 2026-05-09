import { useMutation } from "@tanstack/react-query";
import { updateUser } from "./usersServices";

// update User mutation 
export const useUpdateUser = () => {
    return useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            console.log(data);
        }
    })
}